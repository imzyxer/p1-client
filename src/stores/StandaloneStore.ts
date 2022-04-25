import { action, makeObservable, observable } from 'mobx';
import md5 from 'md5';
import { Nullable } from 'types/app';

class StandaloneStore {
  @observable isStandalone = false;
  @observable passCode: Nullable<string> = null;

  constructor() {
    makeObservable(this);
    if (sessionStorage.getItem('isStandalone')) {
      this.isStandalone = true;
    }
    if (localStorage.getItem('passCode')) {
      this.passCode = localStorage.getItem('passCode');
    }
  }

  @action
  public setIsStandalone() {
    this.isStandalone = true;
    return sessionStorage.setItem('isStandalone', '1');
  }

  @action
  public setPassCode(passCode: string) {
    this.passCode = md5(passCode);
    return localStorage.setItem('passCode', this.passCode);
  }

  @action
  public clearPassCode() {
    this.passCode = null;
    return localStorage.removeItem('passCode');
  }

  get isProtectedByPassCode() {
    return this.passCode !== null;
  }

  public validatePassCode = (passCode: string) => md5(passCode) === this.passCode;
}

export default StandaloneStore;
export type TStandaloneStore = StandaloneStore;
