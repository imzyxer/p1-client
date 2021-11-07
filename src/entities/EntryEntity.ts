import {
  EEntryType,
  IEntry,
  IEntryForCreate,
  IEntryForFormik,
  IEntryForUpdate,
  IEntryRaw,
  TEntryForList,
  TEntryPayload,
  TEntryPayloadCard,
  TEntryPayloadPassword,
} from 'types/entry';
import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { TId } from 'types/app';
import Cipher from 'utils/Cipher';
import PrimaryClient from 'services/PrimaryClient';

class EntryEntity {
  private getCrypt = () => {
    const client = PrimaryClient.getClient();
    const password = client().getAuthenticator().getPassword();
    return new Cipher(password);
  };

  decrypt = (entryRaw: IEntryRaw): IEntry => {
    const crypt = this.getCrypt();
    const payload = crypt.decryptJson(entryRaw.payload);

    return {
      ...entryRaw,
      comment: _isEmpty(entryRaw.comment) ? null : crypt.decrypt(entryRaw.comment ?? ''),
      payload: <TEntryPayload>(_isEmpty(payload) ? this.getDefaultPayload(entryRaw.type) : payload),
    };
  };

  encrypt = (entry: IEntryForCreate | IEntryForUpdate) => {
    const crypt = this.getCrypt();
    return {
      ...entry,
      comment: _isEmpty(entry.comment) ? null : crypt.encrypt(entry.comment ?? ''),
      payload: crypt.encrypt(entry.payload),
    };
  };

  prepareForList = (entries: IEntry[]): TEntryForList[] =>
    entries.map(entry => ({
      ..._omit(entry, ['payload', 'comment']),
      subject: this.extractSubject(entry),
      created: this.extractDate(entry.created),
      updated: this.extractDate(entry.updated),
      requested: this.extractDate(entry.requested),
    }));

  extractDate = (dateIso: string): string => moment(dateIso).format('MM/DD/YYYY kk:mm');

  maskCardNumber = (number: string): string => `•••• ${number.substr(number.length - 4)}`;

  extractSubject = (entry: IEntry): string => {
    switch (entry.type) {
      case EEntryType.PASSWORD:
        return (<TEntryPayloadPassword>entry.payload).login;
      case EEntryType.CARD:
        return this.maskCardNumber((<TEntryPayloadCard>entry.payload).number);
      default:
        return '';
    }
  };

  prepareForFormik = (entry: IEntry): IEntryForFormik => ({
    id: entry.id,
    title: entry.title,
    groupId: entry.groupId,
    type: entry.type,
    comment: entry.comment ?? '',
    payload: entry.payload,
  });

  prepareForUpdate = (data: IEntryForFormik): IEntryForUpdate => ({
    id: <TId>data.id,
    title: data.title,
    groupId: data.groupId,
    comment: _isEmpty(data.comment) ? null : data.comment,
    payload: data.payload,
  });

  prepareForCreate = (data: IEntryForFormik): IEntryForCreate => ({
    title: data.title,
    type: data.type,
    groupId: data.groupId,
    comment: _isEmpty(data.comment) ? null : data.comment,
    payload: data.payload,
  });

  defaultForFormik = (type: EEntryType): IEntryForFormik => ({
    id: null,
    title: '',
    groupId: '',
    type,
    comment: '',
    payload: this.getDefaultPayload(type),
  });

  getDefaultPayload = (entryType: EEntryType): TEntryPayload => {
    switch (entryType) {
      case EEntryType.PASSWORD:
        return { login: '', password: '', link: '' };
      case EEntryType.CARD:
        return { number: '', holder: '', cvc: '', pin: '' };
      default:
        return { login: '', password: '', link: '' };
    }
  };
}

export default new EntryEntity();
