import { action, computed, makeObservable, observable } from 'mobx';
import { doUpdate } from 'services/api/Thing';
import { IThingForFormik } from 'types/thing';
import ThingEntity from 'entities/ThingEntity';
import UserEntity from 'entities/UserEntity';
import { IProfileForFormik } from 'types/user';
import { TRootStore } from 'stores/RootStore';

class ProfileEditStore {
  @observable root: TRootStore;

  constructor(rootStore: TRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public doUpdate = (values: IThingForFormik, success: () => void, failure: () => void): void => {
    const data = ThingEntity.prepareForUpdate(values);
    doUpdate(data)
      .then(
        action('doUpdateSuccess', () => {
          success();
          this.root.appStore.refreshThingList();
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
