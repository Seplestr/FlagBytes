---
title: "Writeup Template"
description: "Markdown template for new challenge writeups."
---

# Writeup Template

A minimal, standardized markdown structure for logging CTF challenges.

```markdown
---
title: "Challenge Name - Platform"
description: "Writeup for Challenge Name on Platform."
tags:
  - platform
  - category
---

# Platform — Challenge Name

<div class="meta-grid">
  <div class="meta-field"><span class="meta-field-label">Platform:</span> PlatformName</div>
  <div class="meta-field"><span class="meta-field-label">Category:</span> Web / Pwn / Crypto / Forensics</div>
  <div class="meta-field"><span class="meta-field-label">Points:</span> 100</div>
  <div class="meta-field"><span class="meta-field-label">Difficulty:</span> <span class="badge badge-easy">Easy</span></div>
</div>

## Problem Statement

> Challenge prompt or description here.

??? tip "Hint"
    Provided hint (if any).

---

## Enumeration & Recon

What was found during initial inspection:

```bash
# Recon commands
file ./binary
checksec ./binary
```

---

## Exploitation

Explain the root cause and the exploit mechanism.

=== "Python (pwntools/requests)"

    ```python
    #!/usr/bin/env python3
    from pwn import *

    r = remote("target.host", 1337)
    # payload
    r.interactive()
    ```

=== "Bash"

    ```bash
    curl -s http://target.host/vuln
    ```

---

## Flag

<div class="flag-box">
  <div>
    <div class="flag-box-title">Flag (Click to reveal)</div>
    <span class="flag-val">flag{example}</span>
  </div>
</div>

---

## Notes & Takeaways

* Key lesson or pitfall to remember.
```
