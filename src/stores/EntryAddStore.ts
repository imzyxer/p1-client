import { action, computed, makeObservable, observable } from 'mobx';
import { EProgress } from 'types/app';
import { EEntryType, IEntryForFormik } from 'types/entry';
import EntryEntity from 'entities/EntryEntity';
import { doCreate } from 'services/api/Entry';
import { IRootStore } from 'types/store';

class EntryAddStore {
  @observable root: IRootStore;
  @observable type: EEntryType = EEntryType.PASSWORD;
  @observable progress: EProgress = EProgress.INIT;
  @observable init = false;

  constructor(rootStore: IRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public open = (type: EEntryType) => {
    this.type = type;
    this.progress = EProgress.LOADED;
    this.init = true;
  };

  @action
  public close = () => {
    this.progress = EProgress.INIT;
  };

  @computed
  get isOpened() {
    return this.progress !== EProgress.INIT;
  }

  @action
  public doCreate = (values: IEntryForFormik, success: () => void, failure: () => void) => {
    const data = EntryEntity.prepareForCreate(values);
    doCreate(data).then(
      action('doCreateResult', response => {
        if (response.isSuccessful) {
          success();
          this.root.appStore.refreshEntryList();
          this.close();
        } else {
          failure();
        }
      })
    );
  };

  get initialValues(): IEntryForFormik {
    return EntryEntity.defaultForFormik(this.type);
  }
}

export default EntryAddStore;
export type TEntryAddStore = EntryAddStore;
