import md5 from 'md5';
import { IUser } from 'types/user';
import { IHistory } from 'types/history';
import PrimaryClient from 'services/PrimaryClient';

const api = PrimaryClient.getClient();
export const signIn = (login: string, password: string) => {
  const data = PrimaryClient.toFormData({
    login,
    signature: md5(password),
  });
  const client = api();
  return client.rawPost<{ accessToken: string; profile: IUser }>('/user/sign-in', data).then(client.handleSuccess).catch(client.handleError);
};

export const signOut = () => api().get('/user/sign-out');

export const fetchUser = () => api().get<IUser>('/user');

export const fetchHistory = () => api().get<IHistory[]>('/user/history');
