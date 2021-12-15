import React, { FC } from 'react';
import { EGroupIcon } from 'types/group';
import EmailIcon from '@mui/icons-material/MailOutline';
import SiteIcon from '@mui/icons-material/CloudQueue';
import ShopIcon from '@mui/icons-material/ShoppingBasket';
import CardIcon from '@mui/icons-material/Payment';
import ImIcon from '@mui/icons-material/Telegram';
import HostingIcon from '@mui/icons-material/Dns';
import WorkIcon from '@mui/icons-material/WorkOutline';
import ApplicationIcon from '@mui/icons-material/PhoneIphone';
import DefaultIcon from '@mui/icons-material/VpnKey';
import { SvgIconProps } from '@mui/material';

export const mapIcons = new Map();
mapIcons.set(EGroupIcon.EMAIL, {
  icon: (props: SvgIconProps) => <EmailIcon {...props} />,
  title: 'Email',
});
mapIcons.set(EGroupIcon.SITE, {
  icon: (props: SvgIconProps) => <SiteIcon {...props} />,
  title: 'Site',
});
mapIcons.set(EGroupIcon.SHOP, {
  icon: (props: SvgIconProps) => <ShopIcon {...props} />,
  title: 'Shop',
});
mapIcons.set(EGroupIcon.CARD, {
  icon: (props: SvgIconProps) => <CardIcon {...props} />,
  title: 'Card',
});
mapIcons.set(EGroupIcon.IM, {
  icon: (props: SvgIconProps) => <ImIcon {...props} />,
  title: 'Messenger',
});
mapIcons.set(EGroupIcon.HOSTING, {
  icon: (props: SvgIconProps) => <HostingIcon {...props} />,
  title: 'Hosting',
});
mapIcons.set(EGroupIcon.WORK, {
  icon: (props: SvgIconProps) => <WorkIcon {...props} />,
  title: 'Work',
});
mapIcons.set(EGroupIcon.APPLICATION, {
  icon: (props: SvgIconProps) => <ApplicationIcon {...props} />,
  title: 'Service',
});
mapIcons.set(EGroupIcon.DEFAULT, {
  icon: (props: SvgIconProps) => <DefaultIcon {...props} />,
  title: 'Key',
});

const GroupIcon: FC<SvgIconProps & { icon: EGroupIcon }> = ({ icon, ...props }) => {
  if (mapIcons.has(icon)) return mapIcons.get(icon).icon(props);
  return mapIcons.get(EGroupIcon.DEFAULT).icon(props);
};

export const GroupIconTitle: FC<{ icon: EGroupIcon }> = ({ icon }) => {
  if (mapIcons.has(icon)) return mapIcons.get(icon).title;
  return mapIcons.get(EGroupIcon.DEFAULT).title;
};

export default GroupIcon;
