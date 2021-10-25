import { Nullable, TId } from 'types/app';

export enum EEntryType {
  PASSWORD = 'PASSWORD',
  CARD = 'CARD',
}

export type TEntryPayloadPassword = {
  login: string;
  password: string;
  link: string;
};

export type TEntryPayloadCard = {
  number: string;
  holder: string;
  cvc: string;
  pin: string;
};

export type TEntryPayload = TEntryPayloadPassword | TEntryPayloadCard;

export type TEncoded = string;

export interface IEntryRaw {
  id: TId;
  title: string;
  groupId: string;
  type: EEntryType;
  payload: TEncoded;
  comment: Nullable<TEncoded>;
  isStarred: boolean;
  created: string;
  updated: string;
  requested: string;
}

export interface IEntry {
  id: TId;
  title: string;
  groupId: string;
  type: EEntryType;
  payload: TEntryPayloadPassword | TEntryPayloadCard;
  comment: Nullable<string>;
  isStarred: boolean;
  created: string;
  updated: string;
  requested: string;
}

export type TEntryForList = Omit<IEntry, 'payload' | 'comment'> & {
  subject: string;
};

export interface IEntryForFormik {
  id: Nullable<TId>;
  title: string;
  groupId: string;
  type: EEntryType;
  payload: TEntryPayloadPassword | TEntryPayloadCard;
  comment: string;
}

export interface IEntryForUpdate {
  id: TId;
  title: string;
  groupId: string;
  comment: Nullable<string>;
  payload: TEntryPayloadPassword | TEntryPayloadCard;
}

export interface IEntryForCreate {
  title: string;
  type: EEntryType;
  groupId: string;
  comment: Nullable<string>;
  payload: TEntryPayloadPassword | TEntryPayloadCard;
}
