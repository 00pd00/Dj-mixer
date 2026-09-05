# Overview

Welcome to the comprehensive guide for CTCX (TcX) releases and associated development branches. This document provides detailed information for both end users and technical operators regarding the latest and historical releases, as well as environment-specific deployment tags and branches.

- **CTCX follows Teamcenter’s release cycles**, adopting both main and patch releases, and adheres to the Teamcenter naming conventions.
- **Source code repository:** GitLab is the platform for all code management.
- **Main concepts:**
  - **Commit ID:** Every change committed to Git generates a unique alphanumeric identifier called a commit ID. While conceptually similar to a CP (Change Package) in DMS, commit IDs and CPs differ beyond listing files and changes.
  - **Tag:** A tag acts as an alias for a specific commit ID. Once code is tagged, it becomes immutable. TcX releases are always tagged, and these tags are distributed to customers.
  - **Branch:** A branch allows ongoing code changes and the creation of merge requests (similar to a CP in DMS). After TcX is released and tagged, branches for patches are created from the release tag. Branches follow the naming convention `br.<Tag>`. For example, for tag `4.0.0`, the branch would be `br.4.0.0`. Developers use these branches for bug fixes and MRs (Merge Requests).
