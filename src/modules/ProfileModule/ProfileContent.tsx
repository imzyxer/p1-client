import React, { FC } from 'react';
import Grid from '@mui/material/Grid';
import PageContainer from 'components/common/PageContainer';
import PassCodeBlock from 'modules/ProfileModule/blocks/PassCodeBlock';
import ProfileBlock from 'modules/ProfileModule/blocks/ProfileBlock';
import useRootStore from 'stores/hooks/useRootStore';

const ProfileContent: FC = () => {
  const { standaloneStore } = useRootStore();

  return (
    <PageContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProfileBlock />
        </Grid>
        {standaloneStore.isStandalone && (
          <Grid item xs={12} md={6}>
            <PassCodeBlock />
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default ProfileContent;
