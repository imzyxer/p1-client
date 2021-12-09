import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';
import GlobalLoader from 'components/common/GlobalLoader';
import Wrapper from 'components/App/Wrapper';
import Envelope from 'components/Envelope';
import useAppStore from 'stores/hooks/useAppStore';
import DashboardElement from 'elements/DashboardElement';
import HistoryElement from 'elements/HistoryElement';
import GroupViewElement from 'elements/GroupViewElement';
import HomeElement from 'elements/HomeElement';
import InternalErrorElement from 'elements/InternalErrorElement';
import LoginElement from 'elements/LoginElement';
import NotFoundElement from 'elements/NotFoundElement';
import ProfileElement from 'elements/ProfileElement';
import SignupElement from 'elements/SignupElement';

const App: FC = () => {
  const appStore = useAppStore();

  useEffect(() => {
    appStore.initiate();
  }, [appStore]);

  if (!appStore.isInit) {
    return <GlobalLoader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route index element={<HomeElement />} />
        <Route element={<Envelope />}>
          <Route path="dashboard" element={<DashboardElement />} />
          <Route path="group/:groupId" element={<GroupViewElement />} />
          <Route path="history" element={<HistoryElement />} />
          <Route path="profile" element={<ProfileElement />} />
        </Route>

        <Route path="login" element={<LoginElement />} />
        <Route path="signup" element={<SignupElement />} />

        <Route path="error/500" element={<InternalErrorElement />} />
        <Route path="*" element={<NotFoundElement />} />
      </Route>
    </Routes>
  );
};

export default observer(App);
