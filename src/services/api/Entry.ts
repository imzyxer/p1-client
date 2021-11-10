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

export const fetchStarred = () => api().get<IEntryRaw[]>('/things/starred').then(decodeAtomCollectionResponse);

export const fetchLatest = () => api().get<IEntryRaw[]>('/things/latest').then(decodeAtomCollectionResponse);

export const fetchByGroup = (groupId: TId) => api().get<IEntryRaw[]>(`/things/group/${groupId}`).then(decodeAtomCollectionResponse);

export const fetchById = (entryId: TId) => api().get<IEntryRaw>(`/things/${entryId}`).then(decodeAtomResponse);

export const doUpdate = (data: IEntryForUpdate) => api().put<TResult>(`/things/${data.id}`, EntryEntity.encrypt(data));

export const doCreate = (data: IEntryForCreate) => api().post<TResult>('/things', PrimaryClient.toFormData(EntryEntity.encrypt(data)));

export const doRemove = (entryId: TId) => api().delete<TResult>(`/things/${entryId}`);

export const doStarred = (entryId: TId) => api().put<TResult>(`/things/starred/${entryId}`, {});
