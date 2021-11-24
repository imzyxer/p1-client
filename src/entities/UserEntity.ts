import { IUser, IProfileForFormik } from 'types/user';
import * as Yup from 'yup';

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

  validationSchemaForLogin = () =>
    Yup.object({
      login: Yup.string().required('This field is required').email('The email is invalid'),
      password: Yup.string().required('This field is required'),
    });
}

export default new UserEntity();
