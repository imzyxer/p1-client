import { TAppStore } from 'stores/AppStore';
import { TRefsStore } from 'stores/RefsStore';
import { TDashboardStore } from 'stores/DashboardStore';
import { TGroupViewStore } from 'stores/GroupViewStore';
import { TEntryViewStore } from 'stores/EntryViewStore';
import { TEntryEditStore } from 'stores/EntryEditStore';
import { TEntryAddStore } from 'stores/EntryAddStore';
import { THistoryStore } from 'stores/HistoryStore';
import { TGroupsManageStore } from 'stores/GroupsManageStore';

export interface IRootStore {
  appStore: TAppStore;
  refsStore: TRefsStore;
  dashboardStore: TDashboardStore;
  groupViewStore: TGroupViewStore;
  groupsManageStore: TGroupsManageStore;
  historyStore: THistoryStore;
  entryViewStore: TEntryViewStore;
  entryEditStore: TEntryEditStore;
  entryAddStore: TEntryAddStore;
}
