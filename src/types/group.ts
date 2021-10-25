import { Nullable, TId } from 'types/app';

export enum EGroupIcon {
  EMAIL = 'EMAIL',
  SITE = 'SITE',
  SHOP = 'SHOP',
  CARD = 'CARD',
  IM = 'IM',
  WORK = 'WORK',
  HOSTING = 'HOSTING',
  APPLICATION = 'APPLICATION',
  DEFAULT = 'DEFAULT',
}

export interface IGroup {
  id: TId;
  name: string;
  icon: EGroupIcon;
  isEmpty: boolean;
}

export interface IGroupForFormik {
  id: Nullable<TId>;
  name: string;
  icon: EGroupIcon;
}

export interface IGroupForUpdate {
  id: Nullable<TId>;
  name: string;
  icon: EGroupIcon;
}

export interface IGroupForCreate {
  name: string;
  icon: EGroupIcon;
}
