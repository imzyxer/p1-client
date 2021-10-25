import ApiClient from 'services/ApiClient';
import { IEntryForCreate, IEntryForUpdate, IEntryRaw } from 'types/entry';
import { TId, TResult } from 'types/app';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from 'utils/response';
import EntryEntity from 'entities/EntryEntity';
import _isArray from 'lodash/isArray';

const handleSuccess = (response: AxiosResponse<IEntryRaw | IEntryRaw[]>) => {
  const data = _isArray(response.data) ? response.data.map(i => EntryEntity.decrypt(i)) : EntryEntity.decrypt(response.data);
  return new SuccessResponse(data);
};

export const fetchStarred = () => ApiClient.takeGet<IEntryRaw[]>('/atoms/starred').then(handleSuccess).catch(ApiClient.handleError);

export const fetchLatest = () => ApiClient.takeGet<IEntryRaw[]>('/atoms/latest').then(handleSuccess).catch(ApiClient.handleError);

export const fetchByGroup = (groupId: TId) => ApiClient.takeGet<IEntryRaw[]>(`/atoms/group/${groupId}`).then(handleSuccess).catch(ApiClient.handleError);

export const fetchById = (entryId: TId) => ApiClient.takeGet<IEntryRaw>(`/atoms/${entryId}`).then(handleSuccess).catch(ApiClient.handleError);

export const doUpdate = (data: IEntryForUpdate) => ApiClient.put<TResult>(`/atoms/${data.id}`, EntryEntity.encrypt(data));

export const doCreate = (data: IEntryForCreate) => ApiClient.post<TResult>('/atoms', EntryEntity.encrypt(data));

export const doRemove = (entryId: TId) => ApiClient.delete<TResult>(`/atoms/${entryId}`);

export const doStarred = (entryId: TId) => ApiClient.put<TResult>(`/atoms/starred/${entryId}`);
