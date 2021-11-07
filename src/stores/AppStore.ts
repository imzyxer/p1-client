import { makeObservable, observable, action, computed } from 'mobx';
import AppAuthenticator from 'services/AppAuthenticator';
import { signIn, signOut, fetchUser } from 'services/api/User';
import { ERole, IUser } from 'types/user';
import { IRootStore } from 'types/store';

const DEFAULT_USER = {
  role: ERole.GUEST,
  email: null,
};

class AppStore {
  @observable root: IRootStore;
  @observable user: IUser = DEFAULT_USER;
  @observable init = false;
  @observable isOpenMenu = false;
  @observable entryHasBeenChanged = 0;

  constructor(rootSore: IRootStore) {
    this.root = rootSore;
    makeObservable(this);
  }

  @action
  public initiate = () => {
    if (this.init) return;
    if (AppAuthenticator.checkTokenAvailability()) {
      fetchUser().then(
        action('fetchUserResult', response => {
          this.setUserData(response.result);
          this.init = true;
        })
      );
    } else {
      AppAuthenticator.revokeCredentials();
      this.init = true;
    }
  };

  @computed
  get isInit() {
    return this.init;
  }

  @action
  public setUserData = (user: IUser) => {
    this.user = user;
  };

  @action
  public resetUserData = () => {
    this.setUserData(DEFAULT_USER);
  };

  @action
  public signIn = (params: { login: string; password: string }, success: () => void, failure: (response: any) => void) => {
    const { login, password } = params;
    signIn(login, password)
      .then(
        action('doSignInSuccess', response => {
          this.setUserData(response.result);
          AppAuthenticator.setCredentials(response.result.accessToken, password);
          success();
        })
      )
      .catch(
        action('doSignInFailure', response => {
          failure(response);
        })
      );
  };

  @action
  public signOut = (success: () => void) => {
    signOut().then(
      action('doSignOutResult', () => {
        AppAuthenticator.revokeCredentials();
        this.setUserData(DEFAULT_USER);
        success();
      })
    );
  };

  protected userIs(role: ERole) {
    return this.user.role === role;
  }

  @computed
  get userIsGuest() {
    return this.userIs(ERole.GUEST);
  }

  @computed
  get userIsClient() {
    return this.userIs(ERole.CLIENT);
  }

  @action
  public setIsOpenMenu(state: boolean) {
    this.isOpenMenu = state;
  }

  @action
  public refreshEntryList() {
    this.entryHasBeenChanged += 1;
  }
}

export default AppStore;
export type TAppStore = AppStore;
