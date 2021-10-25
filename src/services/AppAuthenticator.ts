import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cipher from 'utils/Cipher';
import moment from 'moment';
import { TPassword } from 'types/app';

type JwtPayloadKey = keyof JwtPayload;

class AppAuthenticator {
  static ACCESS_TOKEN_KEY = 'p1AccessToken';
  static SIGNATURE_KEY = 'p1Signature';
  static DELTA_IN_MINUTES = 5;

  setCredentials(accessToken: string, password: string) {
    sessionStorage.setItem(AppAuthenticator.ACCESS_TOKEN_KEY, accessToken);
    const secret = this.getCurrentJti();
    const crypto = new Cipher(secret);
    const signature = crypto.encrypt(password);

    sessionStorage.setItem(AppAuthenticator.SIGNATURE_KEY, signature);
    return this;
  }

  getCurrentJti = () => {
    const accessToken = this.getAccessToken() ?? '';
    return <string>this.jwtDecode<string>(accessToken, 'jti', 'secret');
  };

  getAccessToken = () => sessionStorage.getItem(AppAuthenticator.ACCESS_TOKEN_KEY);
  getSignature = () => sessionStorage.getItem(AppAuthenticator.SIGNATURE_KEY);

  getPassword = (): TPassword => {
    const secret = this.getCurrentJti();
    const crypto = new Cipher(secret);
    return crypto.decrypt(this.getSignature() ?? '');
  };

  revokeCredentials() {
    sessionStorage.removeItem(AppAuthenticator.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(AppAuthenticator.SIGNATURE_KEY);
    return this;
  }

  checkTokenAvailability() {
    const token = this.getAccessToken();

    if (token === null) return false;

    const exp = this.jwtDecode<number>(token, 'exp', 1);

    if (exp !== null) {
      const now = moment().add(AppAuthenticator.DELTA_IN_MINUTES, 'minutes');

      return now.utc().unix() <= exp;
    }

    return false;
  }

  jwtDecode = <T>(token: string, key: JwtPayloadKey, def: T) => {
    let tokenPayload;
    try {
      tokenPayload = jwtDecode<JwtPayload>(token);
    } catch (e) {
      return def;
    }

    return tokenPayload[key] ?? def;
  };
}

export default new AppAuthenticator();
export type TAppAuthenticator = AppAuthenticator;
