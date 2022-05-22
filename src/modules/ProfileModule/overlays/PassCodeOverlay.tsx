import React, { FC, useState } from 'react';
import useRootStore from 'stores/hooks/useRootStore';
import PassCodeScreen from 'components/formControls/PassCodeScreen';
import { useTranslation } from 'react-i18next';
import Backdrop from '@mui/material/Backdrop';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { getProfileUrn } from 'utils/getUrn';

const PassCodeOverlay: FC = () => {
  const { standaloneStore } = useRootStore();
  const { t } = useTranslation('profile');
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [passCode, setPassCode] = useState('');
  const [isError, setIsError] = useState(false);

  const stageFirst = (letters: string) => {
    setPassCode(letters);
    setStep(2);
  };

  const stageSecond = (letters: string) => {
    if (letters === passCode) {
      setIsError(false);
      standaloneStore.setPassCode(letters);
      navigate(getProfileUrn());
      return;
    }
    setIsError(true);
  };

  return (
    <Backdrop
      sx={{
        background: theme => theme.palette.background.default,
        zIndex: theme => theme.zIndex.drawer + 1,
      }}
      open
    >
      <IconButton sx={{ position: 'absolute', top: theme => theme.spacing(1), right: theme => theme.spacing(1) }} onClick={() => navigate(getProfileUrn())}>
        <CloseIcon fontSize="large" />
      </IconButton>
      {step === 1 && <PassCodeScreen title={t('passCodeOverlay.newPassCodeTitle')} isError={false} toAcceptPassCode={stageFirst} />}
      {step === 2 && <PassCodeScreen title={t('passCodeOverlay.repeatPassCodeTitle')} isError={isError} toAcceptPassCode={stageSecond} />}
    </Backdrop>
  );
};

export default PassCodeOverlay;
