import { Nullable } from 'types/app';

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
