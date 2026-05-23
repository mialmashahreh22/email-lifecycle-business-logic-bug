# Remediation Notes

## Main Fixes

- Track account states such as active, deleted, suspended, and pending.
- Filter uniqueness checks to active accounts where appropriate.
- Use a documented cooldown instead of permanent blocking if abuse prevention is required.

## Engineering Checklist

- Add server-side authorization checks.
- Add regression tests for the reported scenario.
- Log suspicious repeated attempts.
- Return minimal response data.
- Document intended business rules.
- Review related endpoints for the same pattern.

## Verification

After remediation, confirm:

- The old step no longer reproduces: Create an account using a test email.
- The old step no longer reproduces: Delete the account.
- The old step no longer reproduces: Try to register again or invite the same email.
- The old step no longer reproduces: Observe that the system still says the email is registered.
