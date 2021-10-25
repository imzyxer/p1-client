import AppStore, { TAppStore } from 'stores/AppStore';
import RefsStore, { TRefsStore } from 'stores/RefsStore';
import DashboardStore, { TDashboardStore } from 'stores/DashboardStore';
import GroupViewStore, { TGroupViewStore } from 'stores/GroupViewStore';
import { IRootStore } from 'types/store';
import { createContext } from 'react';
import EntryViewStore, { TEntryViewStore } from 'stores/EntryViewStore';
import EntryEditStore, { TEntryEditStore } from 'stores/EntryEditStore';
import EntryAddStore, { TEntryAddStore } from 'stores/EntryAddStore';
import HistoryStore, { THistoryStore } from 'stores/HistoryStore';
import GroupsManageStore, { TGroupsManageStore } from 'stores/GroupsManageStore';

export default class RootStore implements IRootStore {
  appStore: TAppStore;
  refsStore: TRefsStore;
  dashboardStore: TDashboardStore;
  groupViewStore: TGroupViewStore; // todo: rename to groupViewStore
  groupsManageStore: TGroupsManageStore;
  entryViewStore: TEntryViewStore;
  entryEditStore: TEntryEditStore;
  entryAddStore: TEntryAddStore;
  historyStore: THistoryStore;

  constructor() {
    this.appStore = new AppStore(this);
    this.refsStore = new RefsStore(this);
    this.dashboardStore = new DashboardStore();
    this.historyStore = new HistoryStore();
    this.groupViewStore = new GroupViewStore(this);
    this.groupsManageStore = new GroupsManageStore(this);
    this.entryViewStore = new EntryViewStore();
    this.entryEditStore = new EntryEditStore(this);
    this.entryAddStore = new EntryAddStore(this);
  }
}

export const RootStoreContext = createContext<IRootStore | null>(null);
