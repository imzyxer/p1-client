import { Nullable } from 'types/app';
import { IHistory } from 'types/history';

export enum ERole {
  GUEST = 'GUEST',
  CLIENT = 'CLIENT',
  // DEMO = 'DEMO',
}

export enum ETheme {
  LIGHT = 'LIGHT',
  // DARK = 'DARK',
}

export interface IUser {
  role: ERole;
  email: string;
  theme: ETheme;
  timezone: string;
  locale: string;
  lastVisit: Nullable<IHistory>;
}

export interface IProfileForFormik {
  email: string;
  theme: ETheme;
  timezone: string;
  locale: string;
  isChangePassword: boolean;
  currentPassword: Nullable<string>;
  newPassword: Nullable<string>;
}
