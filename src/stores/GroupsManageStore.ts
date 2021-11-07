import { action, computed, makeObservable, observable } from 'mobx';
import { IRootStore } from 'types/store';
import { Nullable, TId } from 'types/app';
import { doCreate, doRemove, doUpdate } from 'services/api/Group';
import { IGroupForFormik } from 'types/group';
import GroupEntity from 'entities/GroupEntity';

enum EMode {
  LIST,
  CREATE_FORM,
  EDIT_FORM,
}

class GroupsManageStore {
  @observable root: IRootStore;
  @observable init = false;
  @observable groupId: Nullable<TId> = null;
  @observable opened = false;
  @observable mode: EMode = EMode.LIST;

  constructor(rootStore: IRootStore) {
    this.root = rootStore;
    makeObservable(this);
  }

  @action
  public open = () => {
    this.init = true;
    this.opened = true;
    this.groupId = null;
    this.mode = EMode.LIST;
  };

  @action
  public close = () => {
    this.opened = false;
  };

  @action
  public doCreate = (values: IGroupForFormik, success: () => void, failure: () => void) => {
    const data = GroupEntity.prepareForCreate(values);
    doCreate(data)
      .then(
        action('doCreateGroupSuccess', () => {
          this.root.refsStore.fetchGroups(true);
          success();
        })
      )
      .catch(action('doCreateGroupFailure', () => failure()));
  };

  @action
  public doUpdate = (values: IGroupForFormik, success: () => void, failure: () => void) => {
    const data = GroupEntity.prepareForUpdate(values);
    doUpdate(data)
      .then(
        action('doUpdateGroupSuccess', () => {
          this.root.refsStore.fetchGroups(true);
          success();
        })
      )
      .catch(action('doCreateGroupFailure', () => failure()));
  };

  @action
  public editGroup = (groupId: Nullable<TId>): void => {
    this.groupId = groupId;
    this.mode = EMode.EDIT_FORM;
  };

  @action
  public addGroup = (): void => {
    this.groupId = null;
    this.mode = EMode.CREATE_FORM;
  };

  @action
  public showList = (): void => {
    this.groupId = null;
    this.mode = EMode.LIST;
  };

  @computed
  get isOpened() {
    return this.opened;
  }

  @computed
  get isItList() {
    return this.mode === EMode.LIST;
  }

  @computed
  get isItCreateForm() {
    return this.mode === EMode.CREATE_FORM;
  }

  @computed
  get isItEditForm() {
    return this.mode === EMode.EDIT_FORM;
  }

  @action
  public doRemove = (groupId: TId, success: () => void, failure: () => void) => {
    doRemove(groupId)
      .then(
        action('doRemoveGroupSuccess', () => {
          success();
          this.root.refsStore.fetchGroups(true);
        })
      )
      .catch(action('doRemoveGroupFailure', () => failure()));
  };
}

export default GroupsManageStore;
export type TGroupsManageStore = GroupsManageStore;
