import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import { Field } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import useRefsStore from 'stores/hooks/useRefsStore';
import { EEntryType } from 'types/entry';
import PieceForPassword from 'components/App/forms/EntryBlank/PieceForPassword';
import PieceForCard from 'components/App/forms/EntryBlank/PieceForCard';

const EntryBlank: FC<{ type: EEntryType }> = ({ type }) => {
  const storeRefs = useRefsStore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Field id="title" component={TextField} name="title" label="Title" variant="outlined" fullWidth required />
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="outlined" style={{ minWidth: '100%' }}>
          <InputLabel htmlFor="groupId">Group</InputLabel>
          <Field
            component={Select}
            name="groupId"
            inputProps={{
              id: 'groupId',
            }}
            autoWidth={false}
            labelWidth={50}
          >
            {storeRefs.groups.map(group => (
              <MenuItem key={group.id} value={group.id}>
                {group.name}
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      </Grid>
      {type === EEntryType.PASSWORD && <PieceForPassword />}
      {type === EEntryType.CARD && <PieceForCard />}
      <Grid item xs={12}>
        <Field id="comment" component={TextField} name="comment" label="Comment" variant="outlined" fullWidth multiline rowsMax={4} />
      </Grid>
    </Grid>
  );
};

export default observer(EntryBlank);
