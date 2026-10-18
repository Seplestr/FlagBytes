---
title: "Lets Warm Up - picoCTF"
description: "Walkthrough for picoCTF Lets Warm Up challenge covering hexadecimal to ASCII conversion."
tags:
  - picoctf
  - cryptography
  - general-skills
---

# picoCTF — Lets Warm Up

<div class="meta-grid">
  <div class="meta-field"><span class="meta-field-label">Platform:</span> picoCTF</div>
  <div class="meta-field"><span class="meta-field-label">Category:</span> General Skills</div>
  <div class="meta-field"><span class="meta-field-label">Points:</span> 50</div>
  <div class="meta-field"><span class="meta-field-label">Difficulty:</span> <span class="badge badge-easy">Easy</span></div>
</div>

## Problem Statement

> If I told you a word started with `0x70` in hexadecimal, what would it start with in ASCII?

??? tip "Hint"
    Submit your answer wrapped in the competition's standard flag format: `picoCTF{<character>}`.

---

## Analysis

The input is given in hexadecimal notation (`0x70`):

* Base 16: `0x70`
* Base 10: $(7 \times 16^1) + (0 \times 16^0) = 112$

In standard ASCII encoding, decimal `112` maps to the lowercase character `p`.

---

## Solution

=== "Python"

    ```python
    >>> chr(0x70)
    'p'
    ```

    One-liner to print the full flag:

    ```bash
    python3 -c "print(f'picoCTF{{{chr(0x70)}}}')"
    ```

=== "Bash"

    Using shell builtins:

    ```bash
    printf "\x70\n"
    ```

    Or via `xxd`:

    ```bash
    echo "70" | xxd -r -p; echo ""
    ```

=== "CyberChef"

    1. Load recipe: **From Hex** (delimiter: Auto).
    2. Input: `0x70`.
    3. Output: `p`.

---

## Flag

<div class="flag-box">
  <div>
    <div class="flag-box-title">Flag (Click to reveal)</div>
    <span class="flag-val">picoCTF{p}</span>
  </div>
</div>

---

## Notes

* `0x` denotes hexadecimal literals across C, Python, and shell environments.
* For quick single-byte conversions in the terminal, `printf "\x<hex>\n"` avoids starting an interpreter.