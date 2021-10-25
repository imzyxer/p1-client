import { action, computed, makeObservable, observable } from 'mobx';
import { fetchLatest, fetchStarred } from 'services/api/Entry';
import EntryEntity from 'entities/EntryEntity';
import { IEntry } from 'types/entry';

class DashboardStore {
  @observable latest: IEntry[] = [];
  @observable starred: IEntry[] = [];
  @observable init = false;

  constructor() {
    makeObservable(this);
  }

  @action
  public initiate = (force = false) => {
    if (this.init && !force) return;
    Promise.all([fetchLatest(), fetchStarred()]).then(
      action('fetchDashboardResult', values => {
        const [latestResponse, starredResponse] = values;
        this.latest = latestResponse.result;
        this.starred = starredResponse.result;
        this.init = true;
      })
    );
  };

  @action
  public refresh = () => {
    this.initiate(true);
  };

  @computed
  get isInit() {
    return this.init;
  }

  @computed
  get latestForList() {
    return EntryEntity.prepareForList(this.latest);
  }

  @computed
  get starredForList() {
    return EntryEntity.prepareForList(this.starred);
  }
}

export default DashboardStore;
export type TDashboardStore = DashboardStore;
