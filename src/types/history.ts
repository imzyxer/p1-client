import { TId } from 'types/app';

export interface IHistory {
  id: TId;
  ip: string;
  date: string;
  os: string;
  ua: string;
  location: string;
}
