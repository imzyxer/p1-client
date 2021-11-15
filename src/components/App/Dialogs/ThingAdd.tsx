import React, { FC } from 'react';
import { observer } from 'mobx-react';
import ThingTypeIcon from 'components/common/ThingTypeIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogTitle from 'components/layout/DialogTitle';
import { Form, Formik, FormikHelpers } from 'formik';
import { IThingForFormik } from 'types/thing';
import { useSnackbar } from 'notistack';
import FormLoader from 'components/common/FormLoader';
import useThingAddStore from 'stores/hooks/useThingAddStore';
import ThingBlank from 'components/App/forms/ThingBlank';

const ThingAdd: FC = () => {
  const store = useThingAddStore();
  // const storeRefs = useRefsStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => store.close();
  const onSubmit = (values: IThingForFormik, { setSubmitting }: FormikHelpers<IThingForFormik>) => {
    store.doCreate(
      values,
      () => {
        enqueueSnackbar('Thing added successfully', {
          variant: 'success',
        });
      },
      () => {
        enqueueSnackbar('Oops! Something wrong', {
          variant: 'warning',
        });
        setSubmitting(false);
      }
    );
  };

  const { initialValues, isOpened: open } = store;

  return (
    <Dialog fullWidth fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ dirty, isSubmitting }) => (
          <Form>
            <DialogTitle onClose={handleClose}>
              <ThingTypeIcon type={store.type} />
              <span>&nbsp;Add Thing</span>
            </DialogTitle>
            <FormLoader />
            <DialogContent dividers>
              <ThingBlank type={store.type} />
            </DialogContent>
            <DialogActions>
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

export default observer(ThingAdd);
