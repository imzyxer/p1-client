import { action, computed, makeObservable, observable } from 'mobx';

type TParams = {
  [key: string]: any;
};

class DialogStore {
  @observable params: TParams = {};

  constructor() {
    makeObservable(this);
    const p = new URLSearchParams(window.location.hash.replace(/^#/, ''));
    if (p.has('dialog')) {
      this.setParams(Object.fromEntries(p));
    }
  }

  @action
  public open = (dialog: string, params?: TParams) => {
    const p = new URLSearchParams(params);
    p.set('dialog', dialog);
    this.setParams(Object.fromEntries(p));
    window.location.hash = p.toString();
  };

  @action
  public setParams = (params: TParams) => {
    if (params.dialog) {
      this.params = params;
    } else {
      this.close();
    }
  };

  @action
  public close = () => {
    this.params = {};
    window.location.hash = '';
  };

  @computed
  get dialog() {
    return this.params?.dialog || null;
  }
}

export default DialogStore;
export type TDialogStore = DialogStore;
