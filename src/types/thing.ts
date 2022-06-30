import { Nullable, TId } from 'types/app';

export enum EThingType {
  PASSWORD = 'PASSWORD',
  CARD = 'CARD',
}

export type TThingPayloadPassword = {
  login: string;
  password: string;
  email: string;
  link: string;
  comment: string;
};

export type TThingPayloadCard = {
  number: string;
  holder: string;
  cvc: string;
  pin: string;
  exp: string;
  comment: string;
};

export type TThingPayload = TThingPayloadPassword | TThingPayloadCard;

export type TEncoded = string;

export interface IThingRaw {
  id: TId;
  title: string;
  groupId: TId;
  type: EThingType;
  payload: TEncoded;
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
  isStarred: boolean;
  isBroken?: boolean;
  created: string;
  updated: string;
  requested: string;
}

export type TThingForList = Omit<IThing, 'payload'> & {
  subject: string;
};

export interface IThingForFormik {
  id: Nullable<TId>;
  title: string;
  groupId: TId;
  type: EThingType;
  payload: TThingPayloadPassword | TThingPayloadCard;
}

export interface IThingForUpdate {
  id: TId;
  title: string;
  groupId: TId;
  payload: TThingPayloadPassword | TThingPayloadCard;
}

export interface IThingForCreate {
  title: string;
  type: EThingType;
  groupId: TId;
  payload: TThingPayloadPassword | TThingPayloadCard;
}
