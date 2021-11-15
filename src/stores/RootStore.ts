import AppStore, { TAppStore } from 'stores/AppStore';
import RefsStore, { TRefsStore } from 'stores/RefsStore';
import DashboardStore, { TDashboardStore } from 'stores/DashboardStore';
import GroupViewStore, { TGroupViewStore } from 'stores/GroupViewStore';
import { IRootStore } from 'types/store';
import { createContext } from 'react';
import ThingViewStore, { TThingViewStore } from 'stores/ThingViewStore';
import ThingEditStore, { TThingEditStore } from 'stores/ThingEditStore';
import ThingAddStore, { TThingAddStore } from 'stores/ThingAddStore';
import HistoryStore, { THistoryStore } from 'stores/HistoryStore';
import GroupsManageStore, { TGroupsManageStore } from 'stores/GroupsManageStore';

export default class RootStore implements IRootStore {
  appStore: TAppStore;
  refsStore: TRefsStore;
  dashboardStore: TDashboardStore;
  groupViewStore: TGroupViewStore;
  groupsManageStore: TGroupsManageStore;
  thingViewStore: TThingViewStore;
  thingEditStore: TThingEditStore;
  thingAddStore: TThingAddStore;
  historyStore: THistoryStore;

  constructor() {
    this.appStore = new AppStore(this);
    this.refsStore = new RefsStore(this);
    this.dashboardStore = new DashboardStore();
    this.historyStore = new HistoryStore();
    this.groupViewStore = new GroupViewStore(this);
    this.groupsManageStore = new GroupsManageStore(this);
    this.thingViewStore = new ThingViewStore();
    this.thingEditStore = new ThingEditStore(this);
    this.thingAddStore = new ThingAddStore(this);
  }
}

export const RootStoreContext = createContext<IRootStore | null>(null);
