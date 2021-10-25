import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, Nullable } from 'types/app';
import { fetchByGroup } from 'services/api/Entry';
import { IEntry } from 'types/entry';
import { IRootStore } from 'types/store';
import EntryEntity from 'entities/EntryEntity';

class GroupViewStore {
  @observable root: IRootStore;
  @observable currentGroupId: Nullable<string> = null;
  @observable entries: IEntry[] = [];
  @observable progress: EProgress = EProgress.INIT;

  constructor(rootStore: IRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  protected fetchData = (groupId: string) => {
    fetchByGroup(groupId).then(
      action('fetchByGroupResult', response => {
        if (response.isSuccessful) {
          this.entries = response.result;
        }
        this.progress = EProgress.LOADED;
      })
    );
  };

  @action
  public initiate = (groupId: Nullable<string>) => {
    this.currentGroupId = groupId;
    this.progress = EProgress.INIT;
    this.entries = [];

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
  get entriesForList() {
    return EntryEntity.prepareForList(this.entries);
  }
}

export default GroupViewStore;
export type TGroupViewStore = GroupViewStore;
