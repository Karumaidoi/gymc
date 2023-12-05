// component
import SvgColor from '../../../components/svg-color';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Center Managemnt',
    path: '/dashboard/projects',
    icon: icon('ic_journals'),
  },

  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: icon('ic_award'),
  },

  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_settings'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
