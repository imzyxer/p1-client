import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress, Nullable, TId } from 'types/app';
import { fetchById } from 'services/api/Entry';
import { IEntry, TEntryPayloadCard, TEntryPayloadPassword } from 'types/entry';

class EntryViewStore {
  @observable currentEntryId: Nullable<TId> = null;
  @observable entry: Nullable<IEntry> = null;
  @observable progress: EProgress = EProgress.INIT;
  @observable init = false;

  constructor() {
    makeObservable(this);
  }

  @action
  public open = (entryId: TId) => {
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
  public close = () => {
    this.progress = EProgress.INIT;
    this.currentEntryId = null;
    this.entry = null;
  };

  @computed
  get isEntryCardOpened() {
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

  payload<T extends TEntryPayloadPassword | TEntryPayloadCard>(): T {
    if (this.entry === null) {
      throw new Error('Entry has not been loaded yet');
    }

    return <T>this.entry.payload;
  }

  @computed
  get passwordPayload(): TEntryPayloadPassword {
    return this.payload<TEntryPayloadPassword>();
  }

  @computed
  get cardPayload(): TEntryPayloadCard {
    return this.payload<TEntryPayloadCard>();
  }
}

export default EntryViewStore;
export type TEntryViewStore = EntryViewStore;
