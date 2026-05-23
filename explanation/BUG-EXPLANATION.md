# Email Lifecycle Business Logic Bug - Bug Explanation

## What Is the Bug?

After an account is deleted, the email should no longer behave like it belongs to an active account. In this bug, the system still blocks that email during signup or invitation.

## Vulnerability Type

Business Logic / Account Lifecycle

## Why It Happens

The backend likely checks only whether the email exists in the database, instead of checking whether the related account is active, deleted, suspended, or pending.

## Why It Matters

Business logic bugs often happen when the system state changes but validation rules still use old assumptions.

## Safe Lab Version

This repository includes a safe local simulation of the bug. The lab does not contact any real target or live service.

Lab path:

```text
labs/ctf-game/
```

## How to Fix

- Separate active, deleted, suspended, and pending account states.
- Release emails after deletion unless a documented cooldown is required.
- Write regression tests for delete -> reuse and delete -> reinvite flows.

## Responsible Disclosure Note

For a real report, keep evidence redacted, avoid publishing secrets or private user data, and test only systems where you have permission.
