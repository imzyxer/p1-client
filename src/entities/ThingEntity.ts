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
import Generator from '@zyxer/yapg';
import CCEntity from 'entities/CCEntity';

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
      payload: <TThingPayload>(_isEmpty(payload) ? this.getDefaultPayload(thingRaw.type) : payload),
    };
  };

  encrypt = (thing: IThingForCreate | IThingForUpdate) => {
    const crypt = this.getCrypt();
    return {
      ...thing,
      payload: crypt.encrypt(thing.payload),
    };
  };

  prepareForList = (things: IThing[]): TThingForList[] =>
    things.map(thing => ({
      ..._omit(thing, ['payload']),
      subject: this.extractSubject(thing),
      created: this.extractDate(thing.created),
      updated: this.extractDate(thing.updated),
      requested: this.extractDate(thing.requested),
    }));

  extractDate = (dateIso: string): string => moment.parseZone(dateIso).format('LLL');

  extractSubject = (thing: IThing): string => {
    switch (thing.type) {
      case EThingType.PASSWORD:
        return (<TThingPayloadPassword>thing.payload).login;
      case EThingType.CARD:
        return CCEntity.maskCardNumber((<TThingPayloadCard>thing.payload).number);
      default:
        return '';
    }
  };

  prepareForFormik = (thing: IThing): IThingForFormik => ({
    id: thing.id,
    title: thing.title,
    groupId: thing.groupId,
    type: thing.type,
    payload: thing.payload,
  });

  prepareForUpdate = (data: IThingForFormik): IThingForUpdate => ({
    id: <TId>data.id,
    title: data.title,
    groupId: data.groupId,
    payload: data.payload,
  });

  prepareForCreate = (data: IThingForFormik): IThingForCreate => ({
    title: data.title,
    type: data.type,
    groupId: data.groupId,
    payload: data.payload,
  });

  defaultForFormik = (type: EThingType, groupId?: TId): IThingForFormik => ({
    id: null,
    title: '',
    groupId: groupId || '',
    type,
    payload: this.getDefaultPayload(type),
  });

  getDefaultPayload = (thingType: EThingType): TThingPayload => {
    const pg = new Generator({
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: false,
      length: 12,
      group: 4,
    });

    switch (thingType) {
      case EThingType.PASSWORD:
        return { login: '', password: pg.generate(), link: '', comment: '', email: '' };
      case EThingType.CARD:
        return { number: '', holder: '', cvc: '', pin: '', exp: '', comment: '' };
      default:
        return { login: '', password: '', link: '', comment: '', email: '' };
    }
  };
}

export default new ThingEntity();
