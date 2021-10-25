import { EGroupIcon, IGroup, IGroupForCreate, IGroupForFormik, IGroupForUpdate } from 'types/group';
import { TId } from 'types/app';

class GroupEntity {
  prepareForFormik = (group: IGroup): IGroupForFormik => ({
    id: group.id,
    name: group.name,
    icon: group.icon,
  });

  prepareForUpdate = (data: IGroupForFormik): IGroupForUpdate => ({
    id: <TId>data.id,
    name: data.name,
    icon: data.icon,
  });

  prepareForCreate = (data: IGroupForFormik): IGroupForCreate => ({
    name: data.name,
    icon: data.icon,
  });

  defaultForFormik = (): IGroupForFormik => ({
    id: null,
    name: '',
    icon: EGroupIcon.DEFAULT,
  });
}

export default new GroupEntity();
