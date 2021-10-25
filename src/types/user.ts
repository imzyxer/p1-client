export enum ERole {
  GUEST = 'GUEST',
  CLIENT = 'CLIENT',
  DEMO = 'DEMO',
}

export interface IUser {
  role: ERole;
  email: string | null;
}
