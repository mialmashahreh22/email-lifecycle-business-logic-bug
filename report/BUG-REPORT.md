# Bug Report: Email Lifecycle Business Logic Bug

## Summary

A deleted account's email address remains reserved as if the account were still active, preventing reuse or reinvitation.

## Vulnerability Type

Business Logic / Account Lifecycle

## Severity

Medium

## Related CWE

CWE-664: Improper Control of a Resource Through its Lifetime

## Steps to Reproduce

1. Create an account using a test email.
2. Delete the account.
3. Try to register again or invite the same email.
4. Observe that the system still says the email is registered.

## Expected Behavior

Deleted accounts should not block normal reuse unless a clearly documented cooldown or fraud-control policy exists.

## Actual Behavior

The system appears to check only whether an email exists, without filtering for active versus deleted state.

## Impact

- Users cannot reuse their own email after deleting an account.
- Admins cannot reinvite users who leave and return.
- The platform creates a permanent account lifecycle mismatch.

## Remediation

- Track account states such as active, deleted, suspended, and pending.
- Filter uniqueness checks to active accounts where appropriate.
- Use a documented cooldown instead of permanent blocking if abuse prevention is required.

## Evidence Guidance

For a real responsible disclosure report, include only authorized evidence:

- Redacted screenshots
- Redacted request and response examples
- Timeline of testing
- Clear reproduction steps
- No real secrets, tokens, private personal data, or destructive live actions

## CTF Lab

The lab in `labs/ctf-game` teaches this bug class using safe mock data. Complete all missions to reveal the flag.
