import { Nullable } from 'types/app';
import { IHistory } from 'types/history';

export enum ERole {
  GUEST = 'GUEST',
  CLIENT = 'CLIENT',
  // DEMO = 'DEMO',
}

export enum ETheme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}
export enum ELocale {
  ru_RU = 'ru_RU',
  en_US = 'en_US',
}

export interface IUser {
  role: ERole;
  email: string;
  theme: ETheme;
  timezone: string;
  locale: ELocale;
  lastVisit: Nullable<IHistory>;
}

export interface IProfileForFormik {
  email: string;
  theme: ETheme;
  timezone: string;
  defaultTimezone: any;
  locale: ELocale;
  isChangePassword: boolean;
  currentPassword: Nullable<string>;
  newPassword: Nullable<string>;
}

export interface IProfileForUpdate {
  email: string;
  theme: ETheme;
  timezone: string;
  locale: ELocale;
  currentPassword: Nullable<string>;
  newPassword: Nullable<string>;
}
