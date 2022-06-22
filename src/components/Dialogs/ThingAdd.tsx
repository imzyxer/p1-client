import React, { FC } from 'react';
import { observer } from 'mobx-react';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Form, Formik, FormikHelpers } from 'formik';
import { EThingType, IThingForFormik } from 'types/thing';
import { useSnackbar } from 'notistack';
import FormLoader from 'components/common/FormLoader';
import useThingAddStore from 'stores/hooks/useThingAddStore';
import ThingBlank from 'components/forms/ThingBlank';
import DialogTitle from 'components/Dialog/DialogTitle';
import DialogContent from 'components/Dialog/DialogContent';
import { useTranslation } from 'react-i18next';
import ThingEntity from 'entities/ThingEntity';
import { useParams } from 'react-router-dom';

const ThingAdd: FC = () => {
  const { t } = useTranslation();
  const store = useThingAddStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const handleOnClose = (event: React.MouseEvent, reason: string) => {
    if (reason !== 'backdropClick') store.close();
  };
  const handleClose = () => store.close();
  const onSubmit = (values: IThingForFormik, { setSubmitting }: FormikHelpers<IThingForFormik>) => {
    store.doCreate(
      values,
      () => {
        enqueueSnackbar(t('snackbar.thingAdded'), { variant: 'success' });
      },
      () => {
        enqueueSnackbar('Oops! Something wrong', {
          variant: 'warning',
        });
        setSubmitting(false);
      }
    );
  };
  const params = useParams<'groupId'>();
  const { type, isOpened: open } = store;
  const initialValues = ThingEntity.defaultForFormik(type, params.groupId);
  let title = '';
  switch (store.type) {
    case EThingType.CARD:
      title = t('dialog.thing.titleCard');
      break;
    case EThingType.PASSWORD:
      title = t('dialog.thing.titlePassword');
      break;
    default:
      title = t('dialog.thing.titleDefault');
  }

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleOnClose} aria-labelledby="responsive-dialog-title">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ dirty, isSubmitting }) => (
          <Form>
            <DialogTitle onClose={handleClose}>
              <ThingTypeIcon type={store.type} />
              <span>&nbsp;{title}</span>
            </DialogTitle>
            <FormLoader />
            <DialogContent>
              <ThingBlank type={store.type} />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary" disabled={!dirty || isSubmitting}>
                {t('dialog.btnSave')}
              </Button>
              <Button onClick={handleClose} color="primary">
                {t('dialog.btnCancel')}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(ThingAdd);
