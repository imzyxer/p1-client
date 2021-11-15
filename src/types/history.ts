import { TId } from 'types/app';

export interface IHistory {
  id: TId;
  ip: string;
  datetime: string;
  os: string;
  ua: string;
  location: string;
}
