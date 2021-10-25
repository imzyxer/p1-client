import { action, makeObservable, observable } from 'mobx';
import { Nullable } from 'types/app';

class ConfirmStore {
  @observable options = {
    title: 'Are you sure?',
    description: '',
    confirmationText: 'Ok',
    cancellationText: 'Cancel',
    dialogProps: {},
    confirmationButtonProps: {},
    cancellationButtonProps: {},
  };

  @observable isOpen = false;
  @observable resolve: Nullable<(value: any) => void> = null;
  @observable reject: Nullable<() => void> = null;

  constructor() {
    makeObservable(this);
  }

  @action
  public confirm = (options = {}) =>
    new Promise((resolve, reject) => {
      this.options = { ...this.options, ...options };
      this.reject = reject;
      this.resolve = resolve;
      this.isOpen = true;
    });

  @action
  public handleClose = () => {
    this.reject = null;
    this.resolve = null;
    this.isOpen = false;
  };

  @action
  public handleCancel = () => {
    if (this.reject !== null) this.reject();
    this.handleClose();
  };

  @action
  public handleConfirm = () => {
    if (this.resolve !== null) this.resolve(true);
    this.handleClose();
  };
}

export default new ConfirmStore();
