import { IUser, IProfileForFormik, IProfileForUpdate } from 'types/user';
import * as Yup from 'yup';
import _isEmpty from 'lodash/isEmpty';

class UserEntity {
  prepareProfileForFormik = (profile: IUser): IProfileForFormik => ({
    email: profile.email,
    theme: profile.theme,
    locale: profile.locale,
    timezone: profile.timezone,
    isChangePassword: false,
    currentPassword: '',
    newPassword: '',
  });

  prepareProfileForUpdate = (data: IProfileForFormik): IProfileForUpdate => ({
    email: data.email,
    theme: data.theme,
    locale: data.locale,
    timezone: data.timezone,
    currentPassword: _isEmpty(data.currentPassword) ? null : data.currentPassword,
    newPassword: _isEmpty(data.newPassword) ? null : data.currentPassword,
  });

  validationSchemaForLogin = () =>
    Yup.object({
      login: Yup.string().required('This field is required').email('The email is invalid'),
      password: Yup.string().required('This field is required'),
    });
}

export default new UserEntity();
