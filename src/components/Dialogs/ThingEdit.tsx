import React, { FC } from 'react';
import { observer } from 'mobx-react';
import useThingEditStore from 'stores/hooks/useThingEditStore';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { EProgress } from 'types/app';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import GlobalLoader from 'components/common/GlobalLoader';
import DialogTitle from 'components/common/DialogTitle';
import { Form, Formik, FormikHelpers } from 'formik';
import { IThingForFormik } from 'types/thing';
import { useSnackbar } from 'notistack';
import FormLoader from 'components/common/FormLoader';
import confirmStore from 'stores/ConfirmStore';
import ThingBlank from 'components/forms/ThingBlank';
import { useTranslation } from 'react-i18next';
import Tooltip from '@mui/material/Tooltip';

const ThingEdit: FC = () => {
  const { t } = useTranslation();
  const store = useThingEditStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();
  const handleOnClose = (event: React.MouseEvent, reason: string) => {
    if (reason !== 'backdropClick') store.close();
  };
  const handleClose = () => store.close();
  const onSubmit = (values: IThingForFormik, { setSubmitting }: FormikHelpers<IThingForFormik>) => {
    store.doUpdate(
      values,
      () => {
        enqueueSnackbar(t('snackbar.thingUpdated'), { variant: 'success' });
        store.close();
      },
      () => {
        enqueueSnackbar('Oops! Something wrong', { variant: 'warning' });
        setSubmitting(false);
      }
    );
  };

  if (store.progress === EProgress.LOADING) return <GlobalLoader invisible={false} />;
  if (store.thing === null) return <></>;

  const { initialValues, isModalOpened: open } = store;
  const onDelete = () => {
    confirmStore.confirm({ description: 'Do you want to delete this thing?' }).then(
      () => {
        store.doRemove(
          () => enqueueSnackbar(t('snackbar.thingDeleted'), { variant: 'success' }),
          () => enqueueSnackbar('Oops! Something wrong', { variant: 'warning' })
        );
      },
      () => {}
    );
  };

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleOnClose} aria-labelledby="responsive-dialog-title">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, dirty, isSubmitting }) => (
          <Form>
            <DialogTitle onClose={handleClose}>
              <ThingTypeIcon type={store.data.type} />
              <span>&nbsp;{values.title}</span>
            </DialogTitle>
            <FormLoader />
            <DialogContent dividers>
              <ThingBlank type={store.data.type} />
            </DialogContent>
            <DialogActions>
              <Tooltip title={t<string>('dialog.thing.tooltipDelete')} placement="left">
                <IconButton aria-label="delete" onClick={onDelete} size="large">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
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

export default observer(ThingEdit);
