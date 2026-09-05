# TcUBI Development Guide

## Project Overview
TcUBI is a security-cleared UBI 9 minimal base image for Teamcenter containers. Built from Iron Bank UBI 9, it provides a hardened runtime with non-root user, Artifactory-managed RPMs, and removed disallowed libraries (`libgcrypt`).

## Architecture & Key Decisions

### Security-First Design
- **Base**: `ubi9-minimal:9.6-1760515502` from Iron Bank registry at `gitlab.industrysoftware.automation.siemens.com:4567/thirdparty/ironbank`
- **RPM Source Control**: External UBI repo is **disabled** ([Dockerfile](Dockerfile#L9)). All RPMs must come from Artifactory at `rpm-local/siemens/tc-containers-rhel96`
- **Non-root User**: `tc_user` (UID/GID `10999`) prevents conflicts with RHEL 9.6's reserved GID 999 ([Dockerfile](Dockerfile#L21-L22))
- **Library Removal**: `libgcrypt` libraries are removed post-install to comply with clearing requirements ([Dockerfile](Dockerfile#L32)). Child images needing these must use multi-stage builds

### Version Management
- **SEMVER Pattern**: `<UBI_MAJOR>.<UBI_MINOR>.<TCUBI_PATCH>` (e.g., `9.6.1`)
  - First two digits match UBI version, third increments with each change
  - Tracked in [.gitlab-ci.yml](. gitlab-ci.yml#L27-L28)

## Critical Workflows

### Adding/Updating RPMs
1. **Find RPMs** from Red Hat UBI 9 repositories (BaseOS/AppStream/CodeReady Builder URLs in [README.md](README.md#L15-L17))
2. **Upload to Artifactory**: `rpm-local/siemens/tc-containers-rhel9`
3. **Update [dependencies.txt](dependencies.txt)** with exact version strings (format: `package-version.arch`)
4. **Obtain SRPMs** from Red Hat source repos for TPSR compliance
5. **Build & Test**: CI runs container-structure-test against [test-configs/tcubi-config.yaml](test-configs/tcubi-config.yaml)

### Local Testing
```bash
# Build image
docker build -t tcubi:test .

# Run container-structure-test
container-structure-test test --image tcubi:test --config test-configs/tcubi-config.yaml
```

For local RPM validation, copy RPMs into image and use `rpm -ivh` before committing to Artifactory.

## CI/CD Pipeline
Uses shared templates from `tcbaseimages/devops/ci-templates` project. Pipeline stages:
1. **Hardening-Prerequisite** / **Hardening-StaticAnalysis**: Hadolint linting, security checks
2. **build**: Builds Docker image with SEMVER tag
3. **Hardening-VulnerabilityScanning**: Trivy scan against built image
4. **StaticVerificationTests**: Runs container-structure-test with `tcubi-config.yaml`
5. **push**: Pushes to Harbor registry (`$HARBOR_REGISTRY/tcbaseimages/tcubi:$SEMVER`)
6. **scan**: Trivy SBOM generation, Red Hat subscription manager for source processing

**Key Variables**:
- `UBI_MIN_VERSION`: Must match base image tag ([.gitlab-ci.yml](. gitlab-ci.yml#L26))
- `STATIC_VERIFICATION_CONFIG`: Points to test config in `test-configs/`

## Project Conventions

### File Structure
- **[dependencies.txt](dependencies.txt)**: Newline-separated RPM versions (no wildcards)
- **[config/artifactory.repo](config/artifactory.repo)**: YUM repo config (gpgcheck=0 for internal Artifactory)
- **[test-configs/tcubi-config.yaml](test-configs/tcubi-config.yaml)**: Container-structure-test schema validating user identity, removed files, metadata

### Dockerfile Patterns
- Use `microdnf` (not `yum`) for minimal image operations
- Always clean with `microdnf clean all && rm -rf /var/cache/yum /tmp/* /var/tmp/* /usr/share/doc/* /usr/share/man/* /var/log/*`
- Hadolint ignore for word splitting when reading multi-line dependencies.txt: `# hadolint ignore=SC2046`

### Changelog Discipline
Update [CHANGE_LOG.md](CHANGE_LOG.md) with version header, base image changes, and specific RPM version updates following existing format.

## Integration Points
- **Artifactory**: Single source of truth for RPMs - all must exist there for official builds
- **Harbor Registry**: Final image destination for downstream Teamcenter container builds
- **Red Hat Subscription Manager**: Required for SBOM scan job to fetch source bundles (uses CI variables `CI_REDHAT_USERNAME` / `CI_REDHAT_PASSWORD`)
- **Iron Bank**: Upstream base image source (periodically check for security updates)
