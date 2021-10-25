import moment from 'moment';
import { IHistory } from 'types/history';

class HistoryEntity {
  prepareForList = (history: IHistory[]): IHistory[] =>
    history.map(item => ({
      ...item,
      date: this.extractDate(item.date),
    }));

  extractDate = (dateIso: string): string => moment(dateIso).format('MM/DD/YYYY kk:mm');
}

export default new HistoryEntity();
