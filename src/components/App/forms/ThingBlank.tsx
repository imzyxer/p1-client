import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

import { Field } from 'formik';
import { Select, TextField } from 'formik-mui';
import useRefsStore from 'stores/hooks/useRefsStore';
import { EThingType } from 'types/thing';
import PieceForPassword from 'components/App/forms/ThingBlank/PieceForPassword';
import PieceForCard from 'components/App/forms/ThingBlank/PieceForCard';
import { useTranslation } from 'react-i18next';

const ThingBlank: FC<{ type: EThingType }> = ({ type }) => {
  const { t } = useTranslation();
  const storeRefs = useRefsStore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Field id="title" component={TextField} name="title" label={t('dialog.thing.labelTitle')} variant="outlined" fullWidth required />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
          <Field component={Select} labelId="groupId" name="groupId" label={t('dialog.thing.labelGroup')} required>
            {storeRefs.groups.map(group => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
      {type === EThingType.PASSWORD && <PieceForPassword />}
      {type === EThingType.CARD && <PieceForCard />}
      <Grid item xs={12}>
        <Field id="comment" component={TextField} name="comment" label={t('dialog.thing.labelComment')} variant="outlined" fullWidth multiline maxRows={4} />
      </Grid>
    </Grid>
  );
};

export default observer(ThingBlank);
