import ApiClient from 'services/ApiClient';
import { IGroup, IGroupForCreate, IGroupForUpdate } from 'types/group';
import { TId, TResult } from 'types/app';

export const fetchGroups = () => ApiClient.get<IGroup[]>('/groups');

export const doCreate = (group: IGroupForCreate) => ApiClient.post('/groups', { group });

export const doUpdate = (data: IGroupForUpdate) => ApiClient.put<TResult>(`/groups/${data.id}`, data);

export const doRemove = (groupId: TId) => ApiClient.delete<TResult>(`/groups/${groupId}`);
