import React, { FC } from 'react';
import { observer } from 'mobx-react';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Form, Formik } from 'formik';
import FormLoader from 'components/common/FormLoader';
import useRootStore from 'stores/hooks/useRootStore';
import { EMode } from 'types/app';
import { EGroupIcon, IGroupForFormik } from 'types/group';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import GroupIcon, { GroupIconTitle, mapIcons } from 'components/common/GroupIcon';
import { useTranslation } from 'react-i18next';
import SelectParent from 'components/formControls/SelectParent';
import TextField from 'components/formControls/TextField';

interface IProps {
  mode: EMode;
  initialValues: IGroupForFormik;
  onSubmit: any;
}

const FormBlank: FC<IProps> = ({ mode, initialValues, onSubmit }) => {
  const { t } = useTranslation();
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
                <SelectParent name="icon" label={t('dialog.group.labelIcon')} labelId="icon" required>
                  {Array.from(mapIcons.keys()).map((icon: EGroupIcon) => (
                    <MenuItem value={icon} key={icon}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <GroupIcon icon={icon} fontSize="small" />
                        <div>
                          &nbsp;&nbsp;
                          <GroupIconTitle icon={icon} />
                        </div>
                      </Box>
                    </MenuItem>
                  ))}
                </SelectParent>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField id="name" name="name" label={t('dialog.group.labelName')} required />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary" disabled={mode === EMode.EDIT && (!dirty || isSubmitting)}>
              {t('dialog.btnSave')}
            </Button>
            <Button onClick={handleBack} color="primary">
              {t('dialog.btnBack')}
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default observer(FormBlank);
