import AppStore, { TAppStore } from 'stores/AppStore';
import RefsStore, { TRefsStore } from 'stores/RefsStore';
import DashboardStore, { TDashboardStore } from 'stores/DashboardStore';
import GroupViewStore, { TGroupViewStore } from 'stores/GroupViewStore';
import { createContext } from 'react';
import ThingViewStore, { TThingViewStore } from 'stores/ThingViewStore';
import ThingEditStore, { TThingEditStore } from 'stores/ThingEditStore';
import ThingAddStore, { TThingAddStore } from 'stores/ThingAddStore';
import HistoryStore, { THistoryStore } from 'stores/HistoryStore';
import GroupsManageStore, { TGroupsManageStore } from 'stores/GroupsManageStore';
import ProfileEditStore, { TProfileEditStore } from 'stores/ProfileEditStore';

export default class RootStore {
  public appStore: TAppStore;
  public refsStore: TRefsStore;
  public dashboardStore: TDashboardStore;
  public groupViewStore: TGroupViewStore;
  public groupsManageStore: TGroupsManageStore;
  public thingViewStore: TThingViewStore;
  public thingEditStore: TThingEditStore;
  public thingAddStore: TThingAddStore;
  public historyStore: THistoryStore;
  public profileEditStore: TProfileEditStore;

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
    this.profileEditStore = new ProfileEditStore(this);
  }
}

export type TRootStore = RootStore;
export const RootStoreContext = createContext<TRootStore | null>(null);
