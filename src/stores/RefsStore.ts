import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, ERef, Nullable } from 'types/app';
import { fetchGroups } from 'services/api/Group';
import { IGroup } from 'types/group';
import { IRootStore } from 'types/store';

type TProgress = {
  [key: string]: EProgress;
};

class RefsStore {
  @observable root: IRootStore;
  @observable groups: IGroup[] = [];
  @observable progress: TProgress = {
    [ERef.GROUPS]: EProgress.INIT,
  };

  constructor(rootStore: IRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  fetchGroups = (force = false) => {
    if (!force && this.progress[ERef.GROUPS] !== EProgress.INIT) return;

    this.progress[ERef.GROUPS] = EProgress.LOADING;

    fetchGroups().then(
      action('fetchGroupsResult', response => {
        if (response.isSuccessful) {
          this.groups = response.result;
        }

        this.progress[ERef.GROUPS] = EProgress.LOADED;
      })
    );
  };

  public getProgress(ref: ERef): EProgress {
    return this.progress[ref];
  }

  @computed
  get groupsProgress() {
    return this.getProgress(ERef.GROUPS);
  }

  public getGroup(groupId: string): Nullable<IGroup> {
    return this.groups.find(i => i.id === groupId) || null;
  }
}

export default RefsStore;
export type TRefsStore = RefsStore;
