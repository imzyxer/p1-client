import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, Nullable, TId } from 'types/app';
import { fetchById, doUpdate, doRemove, doStarred } from 'services/api/Entry';
import { IEntryForFormik, IEntry } from 'types/entry';
import { IRootStore } from 'types/store';
import EntryEntity from 'entities/EntryEntity';

class EntryEditStore {
  @observable root: IRootStore;
  @observable currentEntryId: Nullable<TId> = null;
  @observable entry: Nullable<IEntry> = null;
  @observable progress: EProgress = EProgress.INIT;
  @observable init = false;

  constructor(rootStore: IRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public open = (entryId: TId): void => {
    this.currentEntryId = entryId;
    this.progress = EProgress.LOADING;
    this.init = true;

    fetchById(entryId)
      .then(
        action('fetchByIdSuccess', response => {
          this.entry = response.result;
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
    this.currentEntryId = null;
    this.entry = null;
  };

  @action
  public doUpdate = (values: IEntryForFormik, success: () => void, failure: () => void): void => {
    const data = EntryEntity.prepareForUpdate(values);
    doUpdate(data)
      .then(
        action('doUpdateSuccess', () => {
          success();
          this.root.appStore.refreshEntryList();
          this.close();
        })
      )
      .catch(action('doUpdateFailure', () => failure()));
  };

  @action
  public doRemove = (success: () => void, failure: () => void): void => {
    if (this.currentEntryId === null) return;

    doRemove(this.currentEntryId)
      .then(
        action('doRemoveEntrySuccess', () => {
          success();
          this.root.appStore.refreshEntryList();
          this.close();
        })
      )
      .catch(action('doRemoveEntryFailure', () => failure()));
  };

  @action
  doStarred = (entryId: TId, success: () => void): void => {
    doStarred(entryId).then(
      action('doStarredEntryResult', () => {
        success();
        this.root.appStore.refreshEntryList();
      })
    );
  };

  @computed
  get isModalOpened() {
    return this.progress !== EProgress.INIT;
  }

  @computed
  get data(): IEntry {
    if (this.entry === null) {
      throw new Error('Entry has not been loaded yet');
    } else {
      return this.entry;
    }
  }

  @computed
  get initialValues(): IEntryForFormik {
    if (this.entry === null) {
      throw new Error('Entry has not been loaded yet');
    }

    return EntryEntity.prepareForFormik(this.entry);
  }
}

export default EntryEditStore;
export type TEntryEditStore = EntryEditStore;
