import { action, computed, makeObservable, observable } from 'mobx';
import { fetchLatest, fetchStarred } from 'services/api/Thing';
import ThingEntity from 'entities/ThingEntity';
import { IThing } from 'types/thing';

class DashboardStore {
  @observable latest: IThing[] = [];
  @observable starred: IThing[] = [];
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

  @action
  public reset = () => {
    this.init = false;
    this.latest = [];
    this.starred = [];
  };

  @computed
  get isInit() {
    return this.init;
  }

  @computed
  get latestForList() {
    return ThingEntity.prepareForList(this.latest);
  }

  @computed
  get starredForList() {
    return ThingEntity.prepareForList(this.starred);
  }
}

export default DashboardStore;
export type TDashboardStore = DashboardStore;
