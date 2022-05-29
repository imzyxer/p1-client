import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import useRefsStore from 'stores/hooks/useRefsStore';
import { EThingType } from 'types/thing';
import PieceForPassword from 'components/forms/ThingBlank/PieceForPassword';
import PieceForCard from 'components/forms/ThingBlank/PieceForCard';
import { useTranslation } from 'react-i18next';
import TextField from 'components/formControls/TextField';
import SelectParent from 'components/formControls/SelectParent';
import GroupIcon from 'components/common/GroupIcon';

const ThingBlank: FC<{ type: EThingType }> = ({ type }) => {
  const { t } = useTranslation();
  const storeRefs = useRefsStore();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField id="title" name="title" label={t('dialog.thing.labelTitle')} required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectParent name="groupId" label={t('dialog.thing.labelGroup')} labelId="groupId" required displayEmpty>
            {storeRefs.groupOptions.map(item => (
              <MenuItem value={item.value} key={item.value}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <GroupIcon icon={item.icon} fontSize="small" />
                  <div>
                    &nbsp;&nbsp;
                    {item.label}
                  </div>
                </Box>
              </MenuItem>
            ))}
          </SelectParent>
        </Grid>
      </Grid>
      {type === EThingType.PASSWORD && <PieceForPassword />}
      {type === EThingType.CARD && <PieceForCard />}
    </>
  );
};

export default observer(ThingBlank);
