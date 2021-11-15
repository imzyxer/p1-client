import React, { FC } from 'react';
import { observer } from 'mobx-react';
import GroupBlank from 'components/App/forms/GroupBlank';
import { EMode } from 'types/app';
import GroupEntity from 'entities/GroupEntity';
import { IGroupForFormik } from 'types/group';
import { FormikHelpers } from 'formik';
import { IThingForFormik } from 'types/thing';
import { useRootStore } from 'stores/hooks/useRootStore';
import { useSnackbar } from 'notistack';

const GroupAdd: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { groupsManageStore } = useRootStore();
  const initialValues = GroupEntity.defaultForFormik();
  const onSubmit = (values: IGroupForFormik, { setSubmitting }: FormikHelpers<IThingForFormik>) => {
    groupsManageStore.doCreate(
      values,
      () => {
        enqueueSnackbar('Group added successfully', { variant: 'success' });
        groupsManageStore.showList();
      },
      () => {
        enqueueSnackbar('Oops! Something wrong', { variant: 'warning' });
        setSubmitting(false);
      }
    );
  };

  return <GroupBlank mode={EMode.ADD} initialValues={initialValues} onSubmit={onSubmit} />;
};

export default observer(GroupAdd);
