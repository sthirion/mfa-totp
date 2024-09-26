const jsSHA = require("jssha");

function convert_dec2hex(dec) {
  return dec.toString(16);
  // return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

function convert_hex2dec(s) {
  return parseInt(s, 16);
}

function convert_base32tohex(base32) {
  const base32chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let bits = "";
  let hex = "";

  for (let i= 0; i < base32.length; i++) {
    const val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += zeroPreFix(val.toString(2), 5);
  }

  for (let i = 0; i + 4 <= bits.length; i += 4) {
      let chunk = bits.substr(i, 4);
      hex = hex + parseInt(chunk, 2).toString(16);  
  }

  return hex;
}

function zeroPreFix(str, len) {
  if (len + 1 >= str.length) {
    str = Array(len + 1 - str.length).join('0') + str;
  }

  return str;
} 

function getTOTP(mfaSecret) {
  const key = convert_base32tohex(mfaSecret);
  let timeInSec = Math.round(new Date().getTime() / 1000.0);
  let timeString = zeroPreFix(convert_dec2hex(Math.floor(timeInSec / 30)), 16);
  let shaObj = new jsSHA("SHA-1", "HEX");
  shaObj.setHMACKey(key, "HEX");
  shaObj.update(timeString);
  let hmac = shaObj.getHMAC("HEX");
  let offset = convert_hex2dec(hmac.substr(hmac.length - 1));
  let totp = (convert_hex2dec(hmac.substr(offset * 2, 8)) & convert_hex2dec('7fffffff'));
  return (totp).toString().substr(totp.toString().length - 6, 6);
}

function verifyTOTP(mfaSecret, providedTOTP) {
  const generatedTOTP = getTOTP(mfaSecret);
  return generatedTOTP === providedTOTP;
}

module.exports = { getTOTP, verifyTOTP };