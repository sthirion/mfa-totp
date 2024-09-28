# MFA TOTP
Node package to generate and verify an MFA Time-Based One-Time Password based on a secret.

## Installation

```sh
npm install totp-mfa
```

## Usage

### Generating a Time-Based One-Time Password
```sh
const { getTOTP } = require('totp-mfa');

// Generate a random base32 secret (you can use your own method or library)
const secret = 'JBSWY3DPEHPK3PXP'; // Example secret

// Generate TOTP
const totp = getTOTP(secret);
console.log(`Generated TOTP: ${totp}`);
```
### Verify a Time-Based One-Time Password
```sh
const { verifyTOTP } = require('totp-mfa');

// Use the same secret as used for generating the TOTP
const secret = 'JBSWY3DPEHPK3PXP'; // Example secret

// TOTP to verify
const totp = '123456'; // Example TOTP

// Verify TOTP
const isValid = verifyTOTP(secret, totp);
console.log(`Is TOTP valid? ${isValid}`);
```

### Get the validity of a Time-Based One-Time Password
```sh
const { getTOTP, verifyTOTP, getTOTPValidity } = require('totp-mfa');

const secret = 'JBSWY3DPEHPK3PXP'; // Example secret
const totp = getTOTP(secret);
console.log(`Generated TOTP: ${totp}`);

const remainingTime = getTOTPValidity();
console.log(`TOTP is valid for another ${remainingTime} seconds.`);
```