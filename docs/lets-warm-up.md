# CTF #1 - Lets Warm Up

## Problem Statement

> If I told you a word started with 0x70 in hexadecimal, what would it start with in ASCII?

---

## Initial Thoughts

At first glance, the challenge immediately looked related to hexadecimal and ASCII conversion.

Since `0x70` is a hexadecimal value, I assumed the task was simply to convert it into its ASCII equivalent.

---

## Approach

I decided to check what character `0x70` represents in ASCII.

This can be done using:

- an online ASCII table
- Python
- Linux terminal commands

---

## Solution

Using Python:

```python
chr(0x70)
```

Output:

```text
p
```

The hexadecimal value `0x70` corresponds to the character `p` in ASCII.

---

## Flag

```text
picoCTF{p}
```

---

## What I Learned

- Basic hexadecimal to ASCII conversion
- Understanding character encoding
- Using Python for quick conversions

---

> “Every system has a weakness, the challenge is finding it first.”  
> — Seplestr