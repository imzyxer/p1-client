import { IUser, IProfileForFormik, IProfileForUpdate } from 'types/user';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import _isEmpty from 'lodash/isEmpty';

YupPassword(Yup);

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

  validationSchemaForSignIn = () =>
    Yup.object({
      login: Yup.string().required('This field is required').email('The email is invalid'),
      password: Yup.string().required('This field is required'),
    });

  validationSchemaForSignup = () =>
    Yup.object({
      login: Yup.string().required('This field is required').email('The email is invalid'),
      password: Yup.string().min(8).max(250).required('This field is required').minLowercase(1).minUppercase(1).minNumbers(1).label('Password'),
      invitation: Yup.string().required('This field is required').length(26).label('Invitation code'),
    });
}

export default new UserEntity();
