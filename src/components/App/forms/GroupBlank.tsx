import React, { FC } from 'react';
import { observer } from 'mobx-react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Field, Form, Formik } from 'formik';
import FormLoader from 'components/common/FormLoader';
import { useRootStore } from 'stores/hooks/useRootStore';
import { EMode } from 'types/app';
import { EGroupIcon, IGroupForFormik } from 'types/group';
import Grid from '@material-ui/core/Grid';
import { Select, TextField } from 'formik-material-ui';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import GroupIcon, { GroupIconTitle, mapIcons } from 'components/common/GroupIcon';

interface IProps {
  mode: EMode;
  initialValues: IGroupForFormik;
  onSubmit: any;
}

const FormBlank: FC<IProps> = ({ mode, initialValues, onSubmit }) => {
  const { groupsManageStore: store } = useRootStore();
  const handleBack = () => store.showList();

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ dirty, isSubmitting }) => (
        <Form>
          <FormLoader />
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl variant="outlined" style={{ minWidth: '100%' }}>
                  <InputLabel htmlFor="icon">Icon</InputLabel>
                  <Field
                    component={Select}
                    name="icon"
                    inputProps={{
                      id: 'icon',
                    }}
                    autoWidth={false}
                    labelWidth={30}
                    required
                  >
                    {Array.from(mapIcons.keys()).map((icon: EGroupIcon) => (
                      <MenuItem value={icon} key={icon}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <GroupIcon icon={icon} fontSize="small" />
                          <div>
                            &nbsp;&nbsp;
                            <GroupIconTitle icon={icon} />
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <Field id="name" component={TextField} name="name" label="Name" variant="outlined" fullWidth required />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" disabled={mode === EMode.EDIT && (!dirty || isSubmitting)}>
              Save
            </Button>
            <Button onClick={handleBack} color="primary">
              Back
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default observer(FormBlank);
