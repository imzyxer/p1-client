import { Nullable, TId } from 'types/app';

export enum EThingType {
  PASSWORD = 'PASSWORD',
  CARD = 'CARD',
}

export type TThingPayloadPassword = {
  login: string;
  password: string;
  link: string;
};

export type TThingPayloadCard = {
  number: string;
  holder: string;
  cvc: string;
  pin: string;
  exp: string;
};

export type TThingPayload = TThingPayloadPassword | TThingPayloadCard;

export type TEncoded = string;

export interface IThingRaw {
  id: TId;
  title: string;
  groupId: TId;
  type: EThingType;
  payload: TEncoded;
  comment: Nullable<TEncoded>;
  isStarred: boolean;
  created: string;
  updated: string;
  requested: string;
}

export interface IThing {
  id: TId;
  title: string;
  groupId: TId;
  type: EThingType;
  payload: TThingPayloadPassword | TThingPayloadCard;
  comment: Nullable<string>;
  isStarred: boolean;
  created: string;
  updated: string;
  requested: string;
}

export type TThingForList = Omit<IThing, 'payload' | 'comment'> & {
  subject: string;
};

export interface IThingForFormik {
  id: Nullable<TId>;
  title: string;
  groupId: TId;
  type: EThingType;
  payload: TThingPayloadPassword | TThingPayloadCard;
  comment: string;
}

export interface IThingForUpdate {
  id: TId;
  title: string;
  groupId: TId;
  comment: Nullable<string>;
  payload: TThingPayloadPassword | TThingPayloadCard;
}

export interface IThingForCreate {
  title: string;
  type: EThingType;
  groupId: TId;
  comment: Nullable<string>;
  payload: TThingPayloadPassword | TThingPayloadCard;
}
