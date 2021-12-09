import * as pages from 'constants/pages';
import { generatePath } from 'react-router-dom';

export const getHomePageUrn = (): string => generatePath(pages.PATH_HOME);
export const getLoginUrn = (): string => generatePath(pages.PATH_LOGIN);
export const getDashboardUrn = (): string => generatePath(pages.PATH_DASHBOARD);
export const getHistoryUrn = (): string => generatePath(pages.PATH_HISTORY);
export const getProfileUrn = (): string => generatePath(pages.PATH_PROFILE);
export const getGroupUrn = (groupId: string): string => generatePath(pages.PATH_GROUP, { groupId });
