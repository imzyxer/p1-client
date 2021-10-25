import React, { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';
import { EEntryType } from 'types/entry';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PaymentIcon from '@material-ui/icons/Payment';

const EntryTypeIcon: FC<SvgIconProps & { type: EEntryType }> = ({ type, ...props }) => {
  const map = {
    [EEntryType.PASSWORD]: <VpnKeyIcon {...props} />,
    [EEntryType.CARD]: <PaymentIcon {...props} />,
  };

  return map[type];
};

export default EntryTypeIcon;
