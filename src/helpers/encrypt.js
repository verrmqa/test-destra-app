import CryptoJS from 'crypto-js';

const encrypt = (data) => {
  const key = '8pftlCbnS5ho5fh6Z5LWT6izi3PiBDkll7XfhiYlJBDcDSgiYa';
  const crypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    keySize: 128 / 8,
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();

  return crypted;
};
export default encrypt;
