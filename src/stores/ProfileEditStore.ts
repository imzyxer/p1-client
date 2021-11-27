import { action, computed, makeObservable, observable } from 'mobx';
import { doProfileUpdate } from 'services/api/User';
import UserEntity from 'entities/UserEntity';
import { IProfileForFormik, IUser } from 'types/user';
import { TRootStore } from 'stores/RootStore';

class ProfileEditStore {
  @observable root: TRootStore;

  constructor(rootStore: TRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public doUpdate = (values: IProfileForFormik, success: () => void, failure: () => void): void => {
    const data = UserEntity.prepareProfileForUpdate(values);
    doProfileUpdate(data)
      .then(
        action('doUpdateSuccess', response => {
          this.root.appStore.setUserData(<IUser>response.result.data);
          success();
        })
      )
      .catch(action('doUpdateFailure', () => failure()));
  };

  @computed
  get initialValues(): IProfileForFormik {
    return UserEntity.prepareProfileForFormik(this.root.appStore.user);
  }
}

export default ProfileEditStore;
export type TProfileEditStore = ProfileEditStore;
