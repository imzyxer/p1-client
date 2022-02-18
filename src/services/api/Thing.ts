import { IThing, IThingForCreate, IThingForUpdate, IThingRaw } from 'types/thing';
import { TId, TResult } from 'types/app';
import ThingEntity from 'entities/ThingEntity';
import PrimaryClient from 'services/PrimaryClient';
import ResponseDto from 'services/ResponseDto';

const api = PrimaryClient.getClient();
const decodeAtomCollectionResponse = (response: ResponseDto<IThingRaw[]>) => {
  const data = response.result.map(i => ThingEntity.decrypt(i));
  return Promise.resolve(new ResponseDto<IThing[]>(data));
};
const decodeAtomResponse = (response: ResponseDto<IThingRaw>) => Promise.resolve(new ResponseDto<IThing>(ThingEntity.decrypt(response.result)));

export const fetchStarred = () => api().get<IThingRaw[]>('/things/starred').then(decodeAtomCollectionResponse);

export const fetchLatest = () => api().get<IThingRaw[]>('/things/latest').then(decodeAtomCollectionResponse);

export const fetchByGroup = (groupId: TId) => api().get<IThingRaw[]>(`/things/group/${groupId}`).then(decodeAtomCollectionResponse);

export const fetchById = (thingId: TId) => api().get<IThingRaw>(`/things/${thingId}`).then(decodeAtomResponse);

export const doUpdate = (data: IThingForUpdate) => api().put<TResult>(`/things/${data.id}`, ThingEntity.encrypt(data));

export const doCreate = (data: IThingForCreate) => api().post<TResult>('/things', PrimaryClient.toFormData(ThingEntity.encrypt(data)));

export const doRemove = (thingId: TId) => api().delete<TResult>(`/things/${thingId}`);

export const doStarred = (thingId: TId) => api().put<TResult>(`/things/starred/${thingId}`, {});
