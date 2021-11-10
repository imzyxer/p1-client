import { IEntry, IEntryForCreate, IEntryForUpdate, IEntryRaw } from 'types/entry';
import { TId, TResult } from 'types/app';
import EntryEntity from 'entities/EntryEntity';
import PrimaryClient from 'services/PrimaryClient';
import ResponseDto from 'services/ResponseDto';

const api = PrimaryClient.getClient();
const decodeAtomCollectionResponse = (response: ResponseDto<IEntryRaw[]>) => {
  const data = response.result.map(i => EntryEntity.decrypt(i));
  return Promise.resolve(new ResponseDto<IEntry[]>(data));
};
const decodeAtomResponse = (response: ResponseDto<IEntryRaw>) => {
  return Promise.resolve(new ResponseDto<IEntry>(EntryEntity.decrypt(response.result)));
};

export const fetchStarred = () => api().get<IEntryRaw[]>('/atoms/starred').then(decodeAtomCollectionResponse);

export const fetchLatest = () => api().get<IEntryRaw[]>('/atoms/latest').then(decodeAtomCollectionResponse);

export const fetchByGroup = (groupId: TId) => api().get<IEntryRaw[]>(`/atoms/group/${groupId}`).then(decodeAtomCollectionResponse);

export const fetchById = (entryId: TId) => api().get<IEntryRaw>(`/atoms/${entryId}`).then(decodeAtomResponse);

export const doUpdate = (data: IEntryForUpdate) => api().put<TResult>(`/atoms/${data.id}`, EntryEntity.encrypt(data));

export const doCreate = (data: IEntryForCreate) => api().post<TResult>('/atoms', PrimaryClient.toFormData(EntryEntity.encrypt(data)));

export const doRemove = (entryId: TId) => api().delete<TResult>(`/atoms/${entryId}`);

export const doStarred = (entryId: TId) => api().put<TResult>(`/atoms/starred/${entryId}`, {});
