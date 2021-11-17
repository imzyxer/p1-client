import { IUser, IProfileForFormik } from 'types/user';

class UserEntity {
  prepareProfileForFormik = (profile: IUser): IProfileForFormik => ({
    email: profile.email,
    theme: profile.theme,
    locale: profile.locale,
    timezone: profile.timezone,
    isChangePassword: false,
    currentPassword: null,
    newPassword: null,
  });
}

export default new UserEntity();
