import { lazy } from 'react';
import { Redirect } from 'react-router-dom';
// guards
import AuthGuard from '../guards/AuthGuard';
// layouts
import DashboardLayout from '../layouts/dashboard';
//
import { PATH_DASHBOARD } from './paths';

// ----------------------------------------------------------------------

const DashboardRoutes = {
  path: PATH_DASHBOARD.root,
  guard: AuthGuard,
  layout: DashboardLayout,
  routes: [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.general.analytics,
      component: lazy(() => import('../views/GeneralAnalytics'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.root,
      component: () => <Redirect to={PATH_DASHBOARD.general.analytics} />
    },

    // MANAGEMENT : USER
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.user.profile,
      component: lazy(() => import('../views/UserProfile'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.list,
      component: lazy(() => import('../views/UserList'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.user.root,
      component: () => <Redirect to={PATH_DASHBOARD.user.list} />
    },
    // REPORT
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.report.withdraw,
      component: lazy(() => import('../views/ReportWithdraw'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.report.deposit,
      component: lazy(() => import('../views/ReportDeposit'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.report.commission,
      component: lazy(() => import('../views/ReportCommission'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.report.winLost,
      component: lazy(() => import('../views/ReportWinLost'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.report.root,
      component: () => <Redirect to={PATH_DASHBOARD.report.winLost} />
    },
    // APP : CHAT
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.chat.conversation,
      component: lazy(() => import('../views/Chat'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.chat.root,
      component: () => <Redirect to={PATH_DASHBOARD.chat.new} />
    },
    // MANAGEMENT : Transaction
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_DASHBOARD.transaction.summary,
      component: lazy(() => import('../views/SummaryTransaction'))
    },
    {
      exact: true,
      path: PATH_DASHBOARD.transaction.list,
      component: lazy(() => import('../views/TotalList'))
    },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.deposit,
    //   component: lazy(() => import('../views/DepositList'))
    // },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.cashIn,
    //   component: lazy(() => import('../views/CashInList'))
    // },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.cashOut,
    //   component: lazy(() => import('../views/CashOutList'))
    // },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.sent,
    //   component: lazy(() => import('../views/TransactionSent'))
    // },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.commission,
    //   component: lazy(() => import('../views/TransactionCommission'))
    // },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.wait,
    //   component: lazy(() => import('../views/TransactionWait'))
    // },
    // {
    //   exact: true,
    //   path: PATH_DASHBOARD.transaction.rollback,
    //   component: lazy(() => import('../views/TransactionRollback'))
    // },
    {
      exact: true,
      path: PATH_DASHBOARD.transaction.root,
      component: () => <Redirect to={PATH_DASHBOARD.transaction.summary} />
    },

    // ----------------------------------------------------------------------

    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default DashboardRoutes;
