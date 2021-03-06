import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, Nullable, TId } from 'types/app';
import { fetchById } from 'services/api/Thing';
import { IThing, TThingPayloadCard, TThingPayloadPassword } from 'types/thing';
import { TRootStore } from 'stores/RootStore';
import ThingEntity from 'entities/ThingEntity';

class ThingViewStore {
  @observable root: TRootStore;
  @observable currentThingId: Nullable<TId> = null;
  @observable thing: Nullable<IThing> = null;
  @observable progress: EProgress = EProgress.INIT;
  @observable init = false;

  constructor(rootStore: TRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public open = (thingId: TId) => {
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
  public close = () => {
    this.progress = EProgress.INIT;
    this.currentThingId = null;
    this.thing = null;
  };

  @computed
  get isThingCardOpened() {
    return this.progress !== EProgress.INIT;
  }

  @computed
  get group() {
    return this.root.refsStore.getGroup((this.thing as IThing).groupId);
  }

  @computed
  get data(): IThing {
    return this.thing as IThing;
  }

  @computed
  get thingCreated() {
    return ThingEntity.extractDate((this.thing as IThing).created);
  }

  @computed
  get thingUpdated() {
    return ThingEntity.extractDate((this.thing as IThing).updated);
  }

  payload<T extends TThingPayloadPassword | TThingPayloadCard>(): T {
    return <T>(this.thing as IThing).payload;
  }

  @computed
  get passwordPayload(): TThingPayloadPassword {
    return this.payload<TThingPayloadPassword>();
  }

  @computed
  get cardPayload(): TThingPayloadCard {
    return this.payload<TThingPayloadCard>();
  }
}

export default ThingViewStore;
export type TThingViewStore = ThingViewStore;
