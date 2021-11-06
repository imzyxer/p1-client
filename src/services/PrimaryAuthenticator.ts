import IAbstractAuthenticator from 'services/AbstractAuthenticator';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cipher from 'utils/Cipher';
import moment from 'moment';
import { PATH_LOGIN } from 'constants/pages';
import { TPassword } from 'types/app';

type JwtPayloadKey = keyof JwtPayload;

class PrimaryAuthenticator implements IAbstractAuthenticator {
  static ACCESS_TOKEN_KEY = 'p1AccessToken';
  static SIGNATURE_KEY = 'p1Signature';
  static DELTA_IN_MINUTES = 5;

  public setCredentials(accessToken: string, password: string) {
    sessionStorage.setItem(PrimaryAuthenticator.ACCESS_TOKEN_KEY, accessToken);
    const secret = this.getCurrentJti();
    const crypto = new Cipher(secret);
    const signature = crypto.encrypt(password);

    sessionStorage.setItem(PrimaryAuthenticator.SIGNATURE_KEY, signature);
    return this;
  }

  public getAccessToken = () => sessionStorage.getItem(PrimaryAuthenticator.ACCESS_TOKEN_KEY);
  protected getSignature = () => sessionStorage.getItem(PrimaryAuthenticator.SIGNATURE_KEY);

  public getPassword = (): TPassword => {
    const secret = this.getCurrentJti();
    const crypto = new Cipher(secret);
    return crypto.decrypt(this.getSignature() ?? '');
  };

  public getCredentials = () => {
    return Promise.resolve({
      accessToken: this.getAccessToken(),
    });
  };

  public revokeCredentials() {
    sessionStorage.removeItem(PrimaryAuthenticator.ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(PrimaryAuthenticator.SIGNATURE_KEY);
    return this;
  }

  public goToLogin = () => {
    window.location.href = PATH_LOGIN;
  };

  public checkTokenAvailability() {
    const token = this.getAccessToken();

    if (token === null) return false;

    const exp = this.jwtDecode<number>(token, 'exp', 1);

    if (exp !== null) {
      const now = moment().add(PrimaryAuthenticator.DELTA_IN_MINUTES, 'minutes');

      return now.utc().unix() <= exp;
    }

    return false;
  }

  protected getCurrentJti = () => {
    const accessToken = this.getAccessToken() ?? '';
    return <string>this.jwtDecode<string>(accessToken, 'jti', 'secret');
  };

  protected jwtDecode = <T>(token: string, key: JwtPayloadKey, def: T) => {
    let tokenPayload;
    try {
      tokenPayload = jwtDecode<JwtPayload>(token);
    } catch (e) {
      return def;
    }

    return tokenPayload[key] ?? def;
  };
}

export default PrimaryAuthenticator;
export type TPrimaryAuthenticator = PrimaryAuthenticator;
