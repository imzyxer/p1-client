import { IUser, IProfileForFormik, IProfileForUpdate } from 'types/user';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import _isEmpty from 'lodash/isEmpty';
import timezones from 'timezones-list';
import i18n from 'i18next';

YupPassword(Yup);

class UserEntity {
  prepareProfileForFormik = (profile: IUser): IProfileForFormik => ({
    email: profile.email,
    theme: profile.theme,
    locale: profile.locale,
    timezone: profile.timezone,
    defaultTimezone: timezones.find(i => i.tzCode === profile.timezone),
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
      login: Yup.string().required(i18n.t('validations.required')).email(i18n.t('validations.email')),
      password: Yup.string().required(i18n.t('validations.required')),
    });

  validationSchemaForSignup = () =>
    Yup.object({
      login: Yup.string().required(i18n.t('validations.required')).email(i18n.t('validations.email')),
      password: Yup.string().min(8).max(250).required(i18n.t('validations.required')).minLowercase(1).minUppercase(1).minNumbers(1).label('Password'),
      invitation: Yup.string().required(i18n.t('validations.required')).length(26),
    });
}

export default new UserEntity();
