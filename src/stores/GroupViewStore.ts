import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, Nullable } from 'types/app';
import { fetchByGroup } from 'services/api/Thing';
import { IThing } from 'types/thing';
import ThingEntity from 'entities/ThingEntity';
import { TRootStore } from 'stores/RootStore';

class GroupViewStore {
  @observable root: TRootStore;
  @observable currentGroupId: Nullable<string> = null;
  @observable things: IThing[] = [];
  @observable progress: EProgress = EProgress.INIT;

  constructor(rootStore: TRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  protected fetchData = (groupId: string) => {
    fetchByGroup(groupId)
      .then(
        action('fetchByGroupSuccess', response => {
          this.things = response.result;
          this.progress = EProgress.LOADED;
        })
      )
      .catch(
        action('fetchByGroupFailure', () => {
          this.progress = EProgress.LOADED;
        })
      );
  };

  @action
  public initiate = (groupId: Nullable<string>) => {
    this.currentGroupId = groupId;
    this.progress = EProgress.INIT;
    this.things = [];

    if (groupId !== null) {
      this.progress = EProgress.LOADING;
      this.fetchData(groupId);
    }
  };

  @action
  public refresh = () => {
    if (this.currentGroupId !== null) this.fetchData(this.currentGroupId);
  };

  @computed
  get group() {
    return this.root.refsStore.groups.find(i => i.id === this.currentGroupId);
  }

  @computed
  get thingsForList() {
    return ThingEntity.prepareForList(this.things);
  }
}

export default GroupViewStore;
export type TGroupViewStore = GroupViewStore;
