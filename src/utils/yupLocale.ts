import i18n from 'i18next';

const yupLocale = {
  mixed: {
    default: i18n.t('validations.invalid'),
    required: i18n.t('validations.required'),
    notType: ({ type }: any) => i18n.t('validations.invalidType', { type }),
  },
  string: {
    length: ({ path, length }: any) => i18n.t('validations.length', { path, length }),
    email: i18n.t('validations.email'),
    min: ({ min }: any) => i18n.t('validations.stringMin', { min }),
    max: ({ max }: any) => i18n.t('validations.stringMax', { max }),
  },
  number: {},
  boolean: {},
};

export default yupLocale;
