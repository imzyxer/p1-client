import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, Nullable, TId } from 'types/app';
import { fetchById, doUpdate, doRemove, doStarred } from 'services/api/Thing';
import { IThingForFormik, IThing } from 'types/thing';
import { IRootStore } from 'types/store';
import ThingEntity from 'entities/ThingEntity';

class ThingEditStore {
  @observable root: IRootStore;
  @observable currentThingId: Nullable<TId> = null;
  @observable thing: Nullable<IThing> = null;
  @observable progress: EProgress = EProgress.INIT;
  @observable init = false;

  constructor(rootStore: IRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public open = (thingId: TId): void => {
    this.currentThingId = thingId;
    this.progress = EProgress.LOADING;
    this.init = true;

    fetchById(thingId)
      .then(
        action('fetchByIdSuccess', response => {
          this.thing = response.result;
          this.progress = EProgress.LOADED;
        })
      )
      .catch(
        action('fetchByIdFailure', () => {
          this.progress = EProgress.LOADED;
        })
      );
  };

  @action
  public close = (): void => {
    this.progress = EProgress.INIT;
    this.currentThingId = null;
    this.thing = null;
  };

  @action
  public doUpdate = (values: IThingForFormik, success: () => void, failure: () => void): void => {
    const data = ThingEntity.prepareForUpdate(values);
    doUpdate(data)
      .then(
        action('doUpdateSuccess', () => {
          success();
          this.root.appStore.refreshThingList();
          this.close();
        })
      )
      .catch(action('doUpdateFailure', () => failure()));
  };

  @action
  public doRemove = (success: () => void, failure: () => void): void => {
    if (this.currentThingId === null) return;

    doRemove(this.currentThingId)
      .then(
        action('doRemoveThingSuccess', () => {
          success();
          this.root.appStore.refreshThingList();
          this.close();
        })
      )
      .catch(action('doRemoveThingFailure', () => failure()));
  };

  @action
  doStarred = (thingId: TId, success: () => void): void => {
    doStarred(thingId).then(
      action('doStarredThingResult', () => {
        success();
        this.root.appStore.refreshThingList();
      })
    );
  };

  @computed
  get isModalOpened() {
    return this.progress !== EProgress.INIT;
  }

  @computed
  get data(): IThing {
    if (this.thing === null) {
      throw new Error('Thing has not been loaded yet');
    } else {
      return this.thing;
    }
  }

  @computed
  get initialValues(): IThingForFormik {
    if (this.thing === null) {
      throw new Error('Thing has not been loaded yet');
    }

    return ThingEntity.prepareForFormik(this.thing);
  }
}

export default ThingEditStore;
export type TThingEditStore = ThingEditStore;
