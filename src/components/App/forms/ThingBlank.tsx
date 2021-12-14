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

const ThingBlank: FC<{ type: EThingType }> = ({ type }) => {
  const storeRefs = useRefsStore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Field id="title" component={TextField} name="title" label="Title" variant="outlined" fullWidth required />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
          <Field component={Select} labelId="groupId" name="groupId" label="Group *" required>
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
        <Field id="comment" component={TextField} name="comment" label="Comment" variant="outlined" fullWidth multiline maxRows={4} />
      </Grid>
    </Grid>
  );
};

export default observer(ThingBlank);
