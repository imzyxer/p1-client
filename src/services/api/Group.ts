import { IGroup, IGroupForCreate, IGroupForUpdate } from 'types/group';
import { TId, TResult } from 'types/app';
import PrimaryClient from 'services/PrimaryClient';

const api = PrimaryClient.getClient();

export const fetchGroups = () => api().get<IGroup[]>('/groups');

export const doCreate = (group: IGroupForCreate) => api().post('/groups', PrimaryClient.toFormData(group));

export const doUpdate = (data: IGroupForUpdate) => api().put<TResult>(`/groups/${data.id}`, data);

export const doRemove = (groupId: TId) => api().delete<TResult>(`/groups/${groupId}`);
