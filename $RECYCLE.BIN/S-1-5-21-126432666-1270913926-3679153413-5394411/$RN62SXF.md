## Triad License Server Redundancy Test

This document outlines the test cases to verify the high availability and failover capability of the Triad license server configuration. In a Triad setup, **at least two license servers must be operational** at any given time for license validation to succeed.

---

### License Servers in Use

- **splmlicense** (Primary)
- **splmlicense2**
- **splmlicense3**

---

### Test Matrix

| Test # | Action                        | Expected Behavior     | Test Step             | Result |
|--------|-------------------------------|------------------------|------------------------|--------|
| 1      | Stop `splmlicense`            | Remaining 2 should work | Login to AWC          | Pass   |
| 2      | Stop `splmlicense2`           | Remaining 2 should work | Login to AWC          | Pass   |
| 3      | Stop `splmlicense3`           | Remaining 2 should work | Login to AWC          | Pass   |

> In all tests, **AWC login was successful**, confirming that the system continues to function with any **two license servers** up.

---

### Notes

- This test validates fault tolerance of the license server triad.
- If only one license server is available, the license validation will **fail**.

---

### Conclusion

The Triad license configuration is functioning as expected. Any two out of three servers can handle the load and ensure license availability.

Keep at least two servers running at all times to maintain unint
