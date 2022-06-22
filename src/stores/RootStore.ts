import { createContext } from 'react';
import AppStore, { TAppStore } from 'stores/AppStore';
import RefsStore, { TRefsStore } from 'stores/RefsStore';
import DashboardStore, { TDashboardStore } from 'stores/DashboardStore';
import GroupViewStore, { TGroupViewStore } from 'stores/GroupViewStore';
import ThingViewStore, { TThingViewStore } from 'stores/ThingViewStore';
import ThingEditStore, { TThingEditStore } from 'stores/ThingEditStore';
import ThingAddStore, { TThingAddStore } from 'stores/ThingAddStore';
import HistoryStore, { THistoryStore } from 'stores/HistoryStore';
import GroupsManageStore, { TGroupsManageStore } from 'stores/GroupsManageStore';
import ProfileEditStore, { TProfileEditStore } from 'stores/ProfileEditStore';
import StandaloneStore, { TStandaloneStore } from 'stores/StandaloneStore';
import DialogStore, { TDialogStore } from 'stores/DialogStore';

export default class RootStore {
  public appStore: TAppStore;
  public standaloneStore: TStandaloneStore;
  public refsStore: TRefsStore;
  public dashboardStore: TDashboardStore;
  public groupViewStore: TGroupViewStore;
  public groupsManageStore: TGroupsManageStore;
  public thingViewStore: TThingViewStore;
  public thingEditStore: TThingEditStore;
  public thingAddStore: TThingAddStore;
  public historyStore: THistoryStore;
  public profileEditStore: TProfileEditStore;
  public dialogStore: TDialogStore;

  constructor() {
    this.appStore = new AppStore(this);
    this.standaloneStore = new StandaloneStore();
    this.refsStore = new RefsStore(this);
    this.dashboardStore = new DashboardStore();
    this.historyStore = new HistoryStore();
    this.groupViewStore = new GroupViewStore(this);
    this.groupsManageStore = new GroupsManageStore(this);
    this.thingViewStore = new ThingViewStore(this);
    this.thingEditStore = new ThingEditStore(this);
    this.thingAddStore = new ThingAddStore(this);
    this.profileEditStore = new ProfileEditStore(this);
    this.dialogStore = new DialogStore();
  }
}

export type TRootStore = RootStore;
export const RootStoreContext = createContext<TRootStore | null>(null);
