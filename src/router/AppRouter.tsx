import React, { FC, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react';
import GlobalLoader from 'components/common/GlobalLoader';
import Wrapper from 'components/Wrapper';
import useRootStore from 'stores/hooks/useRootStore';
import DashboardElement from 'router/elements/DashboardElement';
import HistoryElement from 'router/elements/HistoryElement';
import GroupViewElement from 'router/elements/GroupViewElement';
import HomeElement from 'router/elements/HomeElement';
import InternalErrorElement from 'router/elements/InternalErrorElement';
import LoginElement from 'router/elements/LoginElement';
import NotFoundElement from 'router/elements/NotFoundElement';
import ProfileElement from 'router/elements/ProfileElement';
import SignupElement from 'router/elements/SignupElement';
import StandaloneElement from 'router/elements/StandaloneElement';

const AppRouter: FC = () => {
  const { appStore } = useRootStore();

  useEffect(() => {
    appStore.initiate();
  }, [appStore]);

  if (!appStore.isInit) {
    return <GlobalLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeElement />} />
          <Route element={<Wrapper />}>
            <Route path="dashboard" element={<DashboardElement />} />
            <Route path="group/:groupId" element={<GroupViewElement />} />
            <Route path="history" element={<HistoryElement />} />
            <Route path="profile/*" element={<ProfileElement />} />
          </Route>

          <Route path="standalone" element={<StandaloneElement />} />
          <Route path="login" element={<LoginElement />} />
          <Route path="signup" element={<SignupElement />} />

          <Route path="error/500" element={<InternalErrorElement />} />
          <Route path="*" element={<NotFoundElement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default observer(AppRouter);
