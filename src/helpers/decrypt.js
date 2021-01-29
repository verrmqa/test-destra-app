import CryptoJS from 'crypto-js';

const decrypt = (data) => {
  const key = '8pftlCbnS5ho5fh6Z5LWT6izi3PiBDkll7XfhiYlJBDcDSgiYa';
  const decrypted = JSON.parse(CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(data, key, {
    keySize: 128 / 8,
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })));

  return decrypted;
};
export default decrypt;
