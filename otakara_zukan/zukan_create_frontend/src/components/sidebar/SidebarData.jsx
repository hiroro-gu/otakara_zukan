import React from 'react'
import {
  Home,
  //Mail as MailIcon,
  Grading as GradingIcon,
  List as ListIcon,
  Create as CreateIcon,
} from '@mui/icons-material';

export const SidebarData = [
  {
    title: "マイページ",
    icon: <Home />,
    link: "/mypage",
  },
  {
    title: "みんなの図鑑",
    icon: <ListIcon />,
    link: "/illustratedbooks",
  },
  {
    title: "図鑑作成",
    icon: <CreateIcon />,
    link: "/new",
  },
];

export const SidebarFooterData = [
  {
    title: "利用規約",
    icon: <GradingIcon />,
    link: "/terms",
  },
  /*{
    title: "お問い合わせ",
    icon: <MailIcon />,
    link: "/mail",
  }*/
];
