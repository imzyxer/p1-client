import CryptoJS from 'crypto-js';
import _isString from 'lodash/isString';

class Cipher {
  protected secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  static isJson = (message: string): boolean => {
    try {
      const result = JSON.parse(message);

      if (typeof result === 'object' && result !== null) {
        return true;
      }
    } catch (e) {
      return false;
    }

    return false;
  };

  public encrypt = <T>(data: string | T): string => {
    let message;
    if (_isString(data)) {
      message = data;
    } else {
      message = JSON.stringify(data);
    }

    return CryptoJS.AES.encrypt(message, this.secret).toString();
  };

  public decrypt = (cipherText: string): string => {
    const bytes = CryptoJS.AES.decrypt(cipherText, this.secret);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  public decryptJson = <T>(cipherText: string): T => {
    const decrypted = this.decrypt(cipherText);
    if (Cipher.isJson(decrypted)) return JSON.parse(decrypted);

    return <T>{};
  };
}

export default Cipher;
