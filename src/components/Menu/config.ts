import { MenuEntry } from '@ogeefinance/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://ogeeswap.com',
      },
      {
        label: 'Liquidity',
        href: 'https://ogeeswap.com/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
//  {
//    label: 'Lottery',
//    icon: 'TicketIcon',
//    href: '/lottery',
//  },
//  {
//    label: 'Collectibles',
//    icon: 'NftIcon',
//    href: '/collectibles',
//  },
//  {
//    label: 'Teams & Profile',
//    icon: 'GroupsIcon',
//    calloutClass: 'rainbow',
//    items: [
//      {
//        label: 'Leaderboard',
//        href: '/teams',
//      },
//      {
//        label: 'Task Center',
//        href: '/profile/tasks',
//      },
//      {
//        label: 'Your Profile',
//        href: '/profile',
//      },
//    ],
//  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.ogeeswap.com',
      },
      {
        label: 'Tokens',
        href: 'https://info.ogeeswap.com/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.ogeeswap.com/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.ogeeswap.com/accounts',
      },
    ],
  },
  {
    label: 'IDO',
    icon: 'IfoIcon',
    href: '/ido',
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/ogeefinance',
      },
      {
        label: 'Docs',
        href: 'https://docs.ogeeswap.com',
      },
    ],
  },
]

export default config
