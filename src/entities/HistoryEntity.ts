import moment from 'moment';
import { IHistory } from 'types/history';

class HistoryEntity {
  prepareForList = (history: IHistory[]): IHistory[] =>
    history.map(item => ({
      ...item,
      datetime: this.extractDate(item.datetime),
    }));

  extractDate = (dateIso: string): string => moment.parseZone(dateIso).format('MM/DD/YYYY kk:mm');
}

export default new HistoryEntity();
