import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress } from 'types/app';
import { EThingType, IThingForFormik } from 'types/thing';
import ThingEntity from 'entities/ThingEntity';
import { doCreate } from 'services/api/Thing';
import { TRootStore } from 'stores/RootStore';

class ThingAddStore {
  @observable root: TRootStore;
  @observable type: EThingType = EThingType.PASSWORD;
  @observable progress: EProgress = EProgress.INIT;
  @observable init = false;

  constructor(rootStore: TRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public open = (type: EThingType) => {
    this.type = type;
    this.progress = EProgress.LOADED;
    this.init = true;
  };

  @action
  public close = () => {
    this.progress = EProgress.INIT;
  };

  @computed
  get isOpened() {
    return this.progress !== EProgress.INIT;
  }

  @action
  public doCreate = (values: IThingForFormik, success: () => void, failure: () => void) => {
    const data = ThingEntity.prepareForCreate(values);
    doCreate(data)
      .then(
        action('doCreateSuccess', () => {
          success();
          this.root.appStore.refreshThingList();
          this.close();
        })
      )
      .catch(
        action('doCreateFailure', () => {
          failure();
        })
      );
  };

  get initialValues(): IThingForFormik {
    return ThingEntity.defaultForFormik(this.type);
  }
}

export default ThingAddStore;
export type TThingAddStore = ThingAddStore;
