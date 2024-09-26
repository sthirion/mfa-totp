# MFA TOTP
Node package to generate and verify an MFA Time-Based One-Time Password based on a secret.

## Installation

```sh
npm install mfa-totp
```

## Usage

### Generating a Time-Based One-Time Password
```sh
const { getTOTP } = require('mfa-totp');

// Generate a random base32 secret (you can use your own method or library)
const secret = 'JBSWY3DPEHPK3PXP'; // Example secret

// Generate TOTP
const totp = getTOTP(secret);
console.log(`Generated TOTP: ${totp}`);
```
### Verify a Time-Based One-Time Password
```sh
const { verifyTOTP } = require('mfa-totp');

// Use the same secret as used for generating the TOTP
const secret = 'JBSWY3DPEHPK3PXP'; // Example secret

// TOTP to verify
const totp = '123456'; // Example TOTP

// Verify TOTP
const isValid = verifyTOTP(secret, totp);
console.log(`Is TOTP valid? ${isValid}`);
```