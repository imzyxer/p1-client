import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import useRefsStore from 'stores/hooks/useRefsStore';
import { EThingType } from 'types/thing';
import PieceForPassword from 'components/forms/ThingBlank/PieceForPassword';
import PieceForCard from 'components/forms/ThingBlank/PieceForCard';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import Select from 'components/formControls/Select';

const ThingBlank: FC<{ type: EThingType }> = ({ type }) => {
  const { t } = useTranslation();
  const storeRefs = useRefsStore();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField id="title" name="title" label={t('dialog.thing.labelTitle')} required />
      </Grid>
      <Grid item xs={6}>
        <Select name="groupId" label={t('dialog.thing.labelGroup')} labelId="groupId" options={storeRefs.groupOptions} required displayEmpty />
      </Grid>
      {type === EThingType.PASSWORD && <PieceForPassword />}
      {type === EThingType.CARD && <PieceForCard />}
      <Grid item xs={12}>
        <TextField id="comment" name="comment" label={t('dialog.thing.labelComment')} multiline maxRows={4} />
      </Grid>
    </Grid>
  );
};

export default observer(ThingBlank);
