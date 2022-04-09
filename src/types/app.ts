export enum EProgress {
  INIT = -1,
  LOADING = 0,
  LOADED = 1,
}

export enum ERef {
  GROUPS = 'groups',
}

export enum EMode {
  ADD,
  EDIT,
}

export enum EElement {
  HOME = 'HOME',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  PROFILE = 'PROFILE',
  HISTORY = 'HISTORY',
  GROUP_VIEW = 'GROUP_VIEW',
  SIGNUP = 'SIGNUP',
}

export type Nullable<T> = T | null;

export type TId = string;
export type TPassword = string;

export type TResult = {
  message: string;
  error?: string;
  result?: string;
};

export type TResultWithData<T> = {
  message: string;
  error?: string;
  data?: T;
};

export type TFormSelectOption = {
  label: string;
  value: string | number;
  disabled?: boolean;
};
