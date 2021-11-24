import { makeObservable, observable, action, computed } from 'mobx';
import { signIn, signOut, fetchUser } from 'services/api/User';
import { ERole, ETheme, IUser } from 'types/user';
import PrimaryClient from 'services/PrimaryClient';
import { TRootStore } from 'stores/RootStore';

const DEFAULT_USER = {
  role: ERole.GUEST,
  email: '',
  theme: ETheme.LIGHT,
  timezone: 'Europe/Moscow',
  locale: 'en_US',
  lastVisit: null,
};

class AppStore {
  @observable root: TRootStore;
  @observable user: IUser = DEFAULT_USER;
  @observable init = false;
  @observable isOpenMenu = false;
  @observable thingHasBeenChanged = 0;

  constructor(rootSore: TRootStore) {
    this.root = rootSore;
    makeObservable(this);
  }

  @action
  public initiate = () => {
    const client = PrimaryClient.getClient();
    const authenticator = client().getAuthenticator();
    if (this.init) return;
    if (authenticator.checkTokenAvailability()) {
      fetchUser().then(
        action('fetchUserResult', response => {
          this.setUserData(response.result);
          this.init = true;
        })
      );
    } else {
      authenticator.revokeCredentials();
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
    const client = PrimaryClient.getClient();
    const authenticator = client().getAuthenticator();
    signIn(login, password)
      .then(
        action('doSignInSuccess', response => {
          this.setUserData(response.result.profile);
          authenticator.setCredentials(response.result.accessToken, password);
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
    const client = PrimaryClient.getClient();
    const authenticator = client().getAuthenticator();
    signOut().then(
      action('doSignOutResult', () => {
        authenticator.revokeCredentials();
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
  public refreshThingList() {
    this.thingHasBeenChanged += 1;
  }
}

export default AppStore;
export type TAppStore = AppStore;
