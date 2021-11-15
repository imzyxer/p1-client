import React, { FC } from 'react';
import { SvgIconProps } from '@material-ui/core';
import { EThingType } from 'types/thing';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import PaymentIcon from '@material-ui/icons/Payment';

const ThingTypeIcon: FC<SvgIconProps & { type: EThingType }> = ({ type, ...props }) => {
  const map = {
    [EThingType.PASSWORD]: <VpnKeyIcon {...props} />,
    [EThingType.CARD]: <PaymentIcon {...props} />,
  };

  return map[type];
};

export default ThingTypeIcon;
