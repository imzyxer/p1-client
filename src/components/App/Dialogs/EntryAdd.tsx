import React, { FC } from 'react';
import { observer } from 'mobx-react';
import EntryTypeIcon from 'components/common/EntryTypeIcon';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import DialogTitle from 'components/layout/DialogTitle';
import { Form, Formik, FormikHelpers } from 'formik';
import { IEntryForFormik } from 'types/entry';
import { useSnackbar } from 'notistack';
import FormLoader from 'components/common/FormLoader';
import useEntryAddStore from 'stores/hooks/useEntryAddStore';
import EntryBlank from 'components/App/forms/EntryBlank';

const EntryAdd: FC = () => {
  const store = useEntryAddStore();
  // const storeRefs = useRefsStore();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => store.close();
  const onSubmit = (values: IEntryForFormik, { setSubmitting }: FormikHelpers<IEntryForFormik>) => {
    store.doCreate(
      values,
      () => {
        enqueueSnackbar('Entry added successfully', {
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
              <EntryTypeIcon type={store.type} />
              <span>&nbsp;Add Entry</span>
            </DialogTitle>
            <FormLoader />
            <DialogContent dividers>
              <EntryBlank type={store.type} />
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

export default observer(EntryAdd);
