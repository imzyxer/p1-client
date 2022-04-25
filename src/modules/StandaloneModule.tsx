import React, { FC, useCallback, useEffect, useState } from 'react';
import useRootStore from 'stores/hooks/useRootStore';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { getLoginUrn } from 'utils/getUrn';
import PassCodeScreen from 'components/formControls/PassCodeScreen';
import { useTranslation } from 'react-i18next';

const StandaloneModule: FC = () => {
  const { standaloneStore } = useRootStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const toAcceptPassCode = useCallback(
    passCode => {
      if (standaloneStore.validatePassCode(passCode)) {
        setIsError(false);
        navigate(getLoginUrn());
        return;
      }
      setIsError(true);
    },
    [navigate, standaloneStore]
  );

  useEffect(() => {
    standaloneStore.setIsStandalone();
  }, [standaloneStore]);

  if (!standaloneStore.isProtectedByPassCode) {
    return <Navigate to={getLoginUrn()} state={{ from: location }} />;
  }

  return <PassCodeScreen title={t('passCode.title')} isError={isError} toAcceptPassCode={toAcceptPassCode} />;
};

export default StandaloneModule;
