import * as pages from 'constants/pages';
import { generatePath } from 'react-router-dom';
import { PAGE_DASHBOARD, PAGE_GROUP, PAGE_HISTORY, PAGE_PROFILE } from 'constants/pages';

export const getHomePageUrn = (): string => generatePath(pages.PATH_HOME);
export const getLoginUrn = (): string => generatePath(pages.PATH_LOGIN);
export const getDashboardUrn = (): string => generatePath(pages.PATH_DASHBOARD, { name: PAGE_DASHBOARD });
export const getHistoryUrn = (): string => generatePath(pages.PATH_HISTORY, { name: PAGE_HISTORY });
export const getProfileUrn = (): string => generatePath(pages.PATH_PROFILE, { name: PAGE_PROFILE });
export const getGroupUrn = (groupId: string): string => generatePath(pages.PATH_GROUP, { name: PAGE_GROUP, groupId });
