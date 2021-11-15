import { TAppStore } from 'stores/AppStore';
import { TRefsStore } from 'stores/RefsStore';
import { TDashboardStore } from 'stores/DashboardStore';
import { TGroupViewStore } from 'stores/GroupViewStore';
import { TThingViewStore } from 'stores/ThingViewStore';
import { TThingEditStore } from 'stores/ThingEditStore';
import { TThingAddStore } from 'stores/ThingAddStore';
import { THistoryStore } from 'stores/HistoryStore';
import { TGroupsManageStore } from 'stores/GroupsManageStore';

export interface IRootStore {
  appStore: TAppStore;
  refsStore: TRefsStore;
  dashboardStore: TDashboardStore;
  groupViewStore: TGroupViewStore;
  groupsManageStore: TGroupsManageStore;
  historyStore: THistoryStore;
  thingViewStore: TThingViewStore;
  thingEditStore: TThingEditStore;
  thingAddStore: TThingAddStore;
}
