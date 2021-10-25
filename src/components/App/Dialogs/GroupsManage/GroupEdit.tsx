import React, { FC } from 'react';
import { observer } from 'mobx-react';
import GroupBlank from 'components/App/forms/GroupBlank';
import { EMode } from 'types/app';
import GroupEntity from 'entities/GroupEntity';
import { computed } from 'mobx';
import { useRootStore } from 'stores/hooks/useRootStore';
import { IGroupForFormik } from 'types/group';
import { IEntryForFormik } from 'types/entry';
import { FormikHelpers } from 'formik';
import { useSnackbar } from 'notistack';

const GroupEdit: FC = () => {
  const { refsStore, groupsManageStore } = useRootStore();
  const { groupId } = groupsManageStore;
  const group = computed(() => refsStore.getGroup(groupId ?? '')).get();
  const { enqueueSnackbar } = useSnackbar();
  const initialValues = group !== null ? GroupEntity.prepareForFormik(group) : GroupEntity.defaultForFormik();
  const onSubmit = (values: IGroupForFormik, { setSubmitting }: FormikHelpers<IEntryForFormik>) => {
    groupsManageStore.doUpdate(
      values,
      () => {
        enqueueSnackbar('Group updated successfully', { variant: 'success' });
        groupsManageStore.showList();
      },
      () => {
        enqueueSnackbar('Oops! Something wrong', { variant: 'warning' });
        setSubmitting(false);
      }
    );
  };

  return <GroupBlank mode={EMode.EDIT} initialValues={initialValues} onSubmit={onSubmit} />;
};

export default observer(GroupEdit);
