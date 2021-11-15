import React, { FC } from 'react';
import { observer } from 'mobx-react';
import useThingEditStore from 'stores/hooks/useThingEditStore';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import { EProgress } from 'types/app';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import GlobalLoader from 'components/common/GlobalLoader';
import DialogTitle from 'components/layout/DialogTitle';
import { Form, Formik, FormikHelpers } from 'formik';
import { IThingForFormik } from 'types/thing';
import { useSnackbar } from 'notistack';
import FormLoader from 'components/common/FormLoader';
import confirmStore from 'stores/ConfirmStore';
import ThingBlank from 'components/App/forms/ThingBlank';

const ThingEdit: FC = () => {
  const store = useThingEditStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => store.close();
  const onSubmit = (values: IThingForFormik, { setSubmitting }: FormikHelpers<IThingForFormik>) => {
    store.doUpdate(
      values,
      () => {
        enqueueSnackbar('Thing updated successfully', { variant: 'success' });
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
          () => enqueueSnackbar('Thing deleted successfully', { variant: 'success' }),
          () => enqueueSnackbar('Oops! Something wrong', { variant: 'warning' })
        );
      },
      () => {}
    );
  };

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
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
              <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
              </IconButton>
              <Button type="submit" color="primary" disabled={!dirty || isSubmitting}>
                Save
              </Button>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default observer(ThingEdit);
