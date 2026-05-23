# Email Lifecycle Business Logic Bug - CTF Lab Guide

This lab is a realistic mock simulation for one bug class.

## Goal

Find the bug in the mock app and unlock the flag.

## How to Run

From this repo root:

```bash
python -m http.server 8000
```

Open:

```text
http://localhost:8000/labs/ctf-game/
```

## What to Do

1. Create the mock account with the provided email.
2. Delete the account.
3. Try to create or invite the same email again.
4. The app blocks the deleted email and unlocks the flag.

## What You Should Learn

Business logic bugs often happen when the system state changes but validation rules still use old assumptions.

## Safety

This is a local mock app. Do not repeat these actions against real websites unless you have explicit authorization.
