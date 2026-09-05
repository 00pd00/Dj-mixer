from __future__ import annotations

import os
import re
import urllib.request
from functools import lru_cache
from typing import Iterable, Iterator, List, Optional

import requests
from dotenv import load_dotenv

__all__ = [
    "session", "find_app", "app_id", "get_sbom",
    "iter_components", "find_lib", "verdict_for", "check",
]


def _env(key: str) -> str:
    load_dotenv()
    value = os.environ.get(key, "").strip()
    if not value:
        raise RuntimeError(f"{key} is not set (see .env.example)")
    return value


@lru_cache(maxsize=1)
def session() -> requests.Session:
    """Lazily build and cache a single authenticated requests.Session.

    Picks up the system proxy (Windows registry / macOS SystemConfiguration /
    env vars) the same way Postman does, so corp networks work out of the box.
    Set ``SI_API_CA_BUNDLE`` to a PEM path if your proxy does TLS MITM.
    """
    s = requests.Session()
    s.headers.update({
        "Authorization": f"Bearer {_env('SI_API_TOKEN')}",
        "Accept": "application/vnd.api+json",
    })
    proxies = urllib.request.getproxies()
    if proxies:
        s.proxies.update(proxies)
    ca = os.environ.get("SI_API_CA_BUNDLE")
    if ca:
        s.verify = ca
    return s


def find_app(name: str, version: Optional[str] = None) -> dict:
    """Return the single application matching ``name`` (case-insensitive exact)
    and optional ``version``. Raises :class:`LookupError` on 0 or >1 matches.
    """
    params = {"name": name, "pageSize": 1000, "includeApproved": "true"}
    if version:
        params["version"] = version
    r = session().get(f"{_env('SI_API_BASE_URL').rstrip('/')}/api/v1/applications",
                      params=params, timeout=30)
    r.raise_for_status()
    body = r.json()
    items = body if isinstance(body, list) else (
        body.get("data") or body.get("content") or body.get("items") or []
    )

    wanted = name.strip().casefold()
    # Normalise version to "X.Y" prefix for loose matching (e.g. "8.10" matches "8.10.2", "8.10-build")
    version_prefix = None
    if version:
        m = re.match(r'^(\d+\.\d+)', version.strip())
        version_prefix = m.group(1) if m else version.strip()

    matches = []
    for it in items:
        if not isinstance(it, dict):
            continue
        attrs = it.get("attributes") if isinstance(it.get("attributes"), dict) else it
        if (attrs.get("name") or "").strip().casefold() != wanted:
            continue
        if version_prefix:
            app_ver = (attrs.get("version") or "").strip()
            # Accept if app version starts with "X.Y" followed by end, ".", or "-"
            if not re.match(r'^' + re.escape(version_prefix) + r'(\.|[-]|$)', app_ver):
                continue
        matches.append(it)

    if len(matches) == 0:
        raise LookupError(
            f"0 applications matched name={name!r}"
            + (f", version={version!r}" if version else "")
        )
    if len(matches) > 1:
        # Prefer the shortest version string (e.g. "8.10.2" over "8.10-1756195339")
        matches.sort(key=lambda it: len((it.get("attributes") or it).get("version") or ""))
    return matches[0]


def app_id(app: dict) -> int:
    """Pull the integer id out of an application dict (handles JSON:API shape)."""
    attrs = app.get("attributes") if isinstance(app.get("attributes"), dict) else {}
    return int(app.get("id") or attrs.get("id"))


def get_sbom(application_id: int, fmt: str = "STANDARD_BOM") -> dict:
    """Fetch an application's SBOM as JSON."""
    r = session().get(
        f"{_env('SI_API_BASE_URL').rstrip('/')}/api/v1/applications/{application_id}/sbom",
        params={"format": fmt}, timeout=30,
    )
    r.raise_for_status()
    return r.json()


def iter_components(sbom: dict) -> Iterator[dict]:
    """Yield every component dict from a STANDARD_BOM/CycloneDX doc, flattened."""
    def walk(items: Iterable) -> Iterator[dict]:
        for c in items or []:
            if not isinstance(c, dict):
                continue
            yield c
            yield from walk(c.get("components"))
    yield from walk(sbom.get("components") if isinstance(sbom, dict) else None)


def _purl_name(purl: str) -> str:
    # pkg:<type>/<ns>/<name>@<ver>?qualifiers#subpath  ->  <name>
    core = purl.split("?", 1)[0].split("#", 1)[0].split("@", 1)[0]
    return core.rsplit("/", 1)[-1]


def find_lib(sbom: dict, lib_name: str) -> List[dict]:
    """Return every component whose name or purl-name matches ``lib_name``.

    Matching is case-insensitive. If the user passes ``group:artifact`` we
    compare against the artifact part too.
    """
    needle = lib_name.strip().casefold().rsplit(":", 1)[-1]
    if not needle:
        return []
    return [
        c for c in iter_components(sbom)
        if needle == (c.get("name") or "").strip().casefold()
        or needle == _purl_name(c.get("purl") or "").casefold()
    ]


def verdict_for(hits: List[dict], wanted_version: Optional[str]) -> str:
    """MATCH | VERSION_MISMATCH | PRESENT | AMBIGUOUS | NOT_FOUND."""
    if not hits:
        return "NOT_FOUND"

    found_versions = {(c.get("version") or "").strip() for c in hits}

    if wanted_version is None:
        has_multiple_versions = len(found_versions) > 1
        return "AMBIGUOUS" if has_multiple_versions else "PRESENT"

    if wanted_version.strip() in found_versions:
        return "MATCH"
    return "VERSION_MISMATCH"


def check(app_name: str, lib_name: str,
          lib_version: Optional[str] = None,
          app_version: Optional[str] = None) -> dict:
    """One-shot compose: find app -> fetch sbom -> find lib -> verdict."""
    app = find_app(app_name, app_version)
    sbom = get_sbom(app_id(app))
    hits = find_lib(sbom, lib_name)
    return {
        "app": app, "lib": lib_name,
        "wanted": lib_version, "found": hits,
        "verdict": verdict_for(hits, lib_version),
    }


if __name__ == "__main__":
    result = check(
        app_name="Siemens Teamcenter UBI",
        app_version="8.10",
        lib_name="glib2",
        # lib_version="2.56.4",
    )

    print(f"Verdict    : {result['verdict']}")
    print(f"App ID     : {result['app'].get('id')}")
    found_versions = [c.get("version") for c in result["found"]]
    print(f"Found ver. : {found_versions if found_versions else 'Not found'}")
