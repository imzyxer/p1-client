import ApiClient from 'services/ApiClient';
import md5 from 'md5';
import { IUser } from 'types/user';
import { IHistory } from 'types/history';

export const signIn = (login: string, password: string) =>
  ApiClient.getClient()
    .post('/user/sign-in', { login, signature: md5(password) })
    .then(ApiClient.handleSuccess)
    .catch(ApiClient.handleError);

export const signOut = () => ApiClient.get('/user/sign-out');

export const fetchUser = () => ApiClient.get<IUser>('/user');

export const fetchHistory = () => ApiClient.get<IHistory[]>('/user/history');
