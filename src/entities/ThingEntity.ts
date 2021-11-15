import {
  EThingType,
  IThing,
  IThingForCreate,
  IThingForFormik,
  IThingForUpdate,
  IThingRaw,
  TThingForList,
  TThingPayload,
  TThingPayloadCard,
  TThingPayloadPassword,
} from 'types/thing';
import _omit from 'lodash/omit';
import _isEmpty from 'lodash/isEmpty';
import moment from 'moment';
import { TId } from 'types/app';
import Cipher from 'utils/Cipher';
import PrimaryClient from 'services/PrimaryClient';

class ThingEntity {
  private getCrypt = () => {
    const client = PrimaryClient.getClient();
    const password = client().getAuthenticator().getPassword();
    return new Cipher(password);
  };

  decrypt = (thingRaw: IThingRaw): IThing => {
    const crypt = this.getCrypt();
    const payload = crypt.decryptJson(thingRaw.payload);

    return {
      ...thingRaw,
      comment: _isEmpty(thingRaw.comment) ? null : crypt.decrypt(thingRaw.comment ?? ''),
      payload: <TThingPayload>(_isEmpty(payload) ? this.getDefaultPayload(thingRaw.type) : payload),
    };
  };

  encrypt = (thing: IThingForCreate | IThingForUpdate) => {
    const crypt = this.getCrypt();
    return {
      ...thing,
      comment: _isEmpty(thing.comment) ? null : crypt.encrypt(thing.comment ?? ''),
      payload: crypt.encrypt(thing.payload),
    };
  };

  prepareForList = (things: IThing[]): TThingForList[] =>
    things.map(thing => ({
      ..._omit(thing, ['payload', 'comment']),
      subject: this.extractSubject(thing),
      created: this.extractDate(thing.created),
      updated: this.extractDate(thing.updated),
      requested: this.extractDate(thing.requested),
    }));

  extractDate = (dateIso: string): string => moment(dateIso).format('MM/DD/YYYY kk:mm');

  maskCardNumber = (number: string): string => `•••• ${number.substr(number.length - 4)}`;

  extractSubject = (thing: IThing): string => {
    switch (thing.type) {
      case EThingType.PASSWORD:
        return (<TThingPayloadPassword>thing.payload).login;
      case EThingType.CARD:
        return this.maskCardNumber((<TThingPayloadCard>thing.payload).number);
      default:
        return '';
    }
  };

  prepareForFormik = (thing: IThing): IThingForFormik => ({
    id: thing.id,
    title: thing.title,
    groupId: thing.groupId,
    type: thing.type,
    comment: thing.comment ?? '',
    payload: thing.payload,
  });

  prepareForUpdate = (data: IThingForFormik): IThingForUpdate => ({
    id: <TId>data.id,
    title: data.title,
    groupId: data.groupId,
    comment: _isEmpty(data.comment) ? null : data.comment,
    payload: data.payload,
  });

  prepareForCreate = (data: IThingForFormik): IThingForCreate => ({
    title: data.title,
    type: data.type,
    groupId: data.groupId,
    comment: _isEmpty(data.comment) ? null : data.comment,
    payload: data.payload,
  });

  defaultForFormik = (type: EThingType): IThingForFormik => ({
    id: null,
    title: '',
    groupId: '',
    type,
    comment: '',
    payload: this.getDefaultPayload(type),
  });

  getDefaultPayload = (thingType: EThingType): TThingPayload => {
    switch (thingType) {
      case EThingType.PASSWORD:
        return { login: '', password: '', link: '' };
      case EThingType.CARD:
        return { number: '', holder: '', cvc: '', pin: '' };
      default:
        return { login: '', password: '', link: '' };
    }
  };
}

export default new ThingEntity();
