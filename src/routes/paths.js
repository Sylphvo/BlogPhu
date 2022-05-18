// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};
export const PATH_PAGE = {
  page404: '/404',
  page500: '/500',
  userChat: '/user-chat/:key'
};

export const PATH_HOME = {
  cloud: 'https://www.sketch.com/s/0fa4699d-a3ff-4cd5-a3a7-d851eb7e17f0',
  purchase: 'https://material-ui.com/store/items/minimal-dashboard/',
  components: '/components',
  dashboard: ROOTS_DASHBOARD
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    analytics: path(ROOTS_DASHBOARD, '/analytics')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile/:key'),
    list: path(ROOTS_DASHBOARD, '/user/list')
  },
  report: {
    root: path(ROOTS_DASHBOARD, '/report'),
    commission: path(ROOTS_DASHBOARD, '/report/commission'),
    deposit: path(ROOTS_DASHBOARD, '/report/deposit'),
    winLost: path(ROOTS_DASHBOARD, '/report/winLost'),
    withdraw: path(ROOTS_DASHBOARD, '/report/withdraw')
  },
  transaction: {
    root: path(ROOTS_DASHBOARD, '/transaction'),
    summary: path(ROOTS_DASHBOARD, '/transaction/summary'),
    list: path(ROOTS_DASHBOARD, '/transaction/list')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: [
      path(ROOTS_DASHBOARD, '/chat/new'),
      path(ROOTS_DASHBOARD, '/chat/:conversationKey')
    ]
  }
};
