import React, { FC } from 'react';
import { SvgIconProps } from '@mui/material';
import { EThingType } from 'types/thing';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PaymentIcon from '@mui/icons-material/Payment';

const ThingTypeIcon: FC<SvgIconProps & { type: EThingType }> = ({ type, ...props }) => {
  const map = {
    [EThingType.PASSWORD]: <VpnKeyIcon {...props} />,
    [EThingType.CARD]: <PaymentIcon {...props} />,
  };

  return map[type];
};

export default ThingTypeIcon;
