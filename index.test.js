const { getTOTP, verifyTOTP, getTOTPValidity } = require('./index');

function generateBase32Secret(length = 16) {
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * base32Chars.length);
    secret += base32Chars[randomIndex];
  }
  return secret;
}
test('generate TOTP', () => {
  const mfaSecret = generateBase32Secret(16); // Generate a random base32 secret
  const totp = getTOTP(mfaSecret);
  expect(totp).toHaveLength(6); // TOTP should be 6 digits long
  expect(totp).toMatch(/\d{6}/); // TOTP should be a 6-digit number
});

test('verify TOTP', () => {
  const mfaSecret = generateBase32Secret(16); // Generate a random base32 secret
  const totp = getTOTP(mfaSecret);
  const isValid = verifyTOTP(mfaSecret, totp);
  expect(isValid).toBe(true); // The verification should return true
});

test('get TOTP validity', () => {
  const remainingTime = getTOTPValidity();
  expect(remainingTime).toBeGreaterThanOrEqual(0); // Remaining time should be >= 0
  expect(remainingTime).toBeLessThanOrEqual(30); // Remaining time should be <= 30
});