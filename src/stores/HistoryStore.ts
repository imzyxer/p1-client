import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress } from 'types/app';
import { IHistory } from 'types/history';
import { fetchHistory } from 'services/api/User';
import HistoryEntity from 'entities/HistoryEntity';

class HistoryStore {
  @observable history: IHistory[] = [];
  @observable progress: EProgress = EProgress.INIT;

  constructor() {
    makeObservable(this);
  }

  protected fetchHistory = () => {
    fetchHistory().then(
      action('fetchHistoryResult', response => {
        if (response.isSuccessful) {
          this.history = response.result;
        }
        this.progress = EProgress.LOADED;
      })
    );
  };

  @action
  public initiate = () => {
    this.progress = EProgress.INIT;
    this.history = [];

    this.progress = EProgress.LOADING;
    this.fetchHistory();
  };

  @computed
  get historyForList() {
    return HistoryEntity.prepareForList(this.history);
  }
}

export default HistoryStore;
export type THistoryStore = HistoryStore;
