import { createSlice } from '@reduxjs/toolkit';
import { Icon } from '@iconify/react';
import arrowDownFill from '@iconify/icons-eva/arrow-down-outline';
import arrowUpFill from '@iconify/icons-eva/arrow-up-outline';
import { getInitialize } from './authJwt';

// utils
import axios from '../../utils/axios';

// const FileSaver = require('file-saver');
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  transactions: [],
  totals: [],
  summaryTrans: [],
  summaryInvoice: [],
  topUser: [],
  issuccessfull: false,
  total: -1,
  deposit: [],
  labels: [],
  topTransaction: [],
  withdraw: [],
  totalSummaryInvoice: -1,
  totalList: [],
  totalTrans: -1,
  totalSummaryTrans: -1,
  totalETH: 0.0,
  totalONE: 0.0,
  totalBET: 0.0,
  totalUser: 0.0,
  totalWETH: 0.0,
  totalDETH: 0.0,
  totalTransfer: 0.0,
  totalCommission: 0.0,
  totalOther: [],
  totalEth: [],
  totalNaga: [],
  topUserName: [],
  topUserLevel: 0
};

const slice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET TRANSACTION
    getInvoice(state, action) {
      state.isLoading = false;
      state.summaryInvoice = action.payload.items;
      state.totalSummaryInvoice = action.payload.total;
    },
    getInvoiceMore(state, action) {
      state.isLoading = false;
      state.summaryInvoice = state.summaryInvoice.concat(action.payload.items);
      state.totalSummaryInvoice = action.payload.total;
    },
    getUser(state, action) {
      state.isLoading = false;
      state.topUserName = action.payload;
    },
    getTotalTrans(state, action) {
      state.isLoading = false;
      state.totalList = action.payload.items;
      state.totalTrans = action.payload.total;
    },
    getTotalTransMore(state, action) {
      state.isLoading = false;
      state.totalList = state.totalList.concat(action.payload.items);
      state.totalTrans = action.payload.total;
    },
    getSummaryTrans(state, action) {
      state.isLoading = false;
      state.summaryTrans = action.payload.items;
      state.totalSummaryTrans = action.payload.total;
    },
    getSummaryTransMore(state, action) {
      state.isLoading = false;
      state.summaryTrans = state.summaryTrans.concat(action.payload.items);
      state.totalSummaryTrans = action.payload.total;
    },
    getSuccessTransactionByUserName(state, action) {
      state.isLoading = false;
      state.transactions = action.payload.items;
      state.total = action.payload.total;
    },
    getMoreTransactionByUserName(state, action) {
      state.isLoading = false;
      state.transactions = state.transactions.concat(action.payload.items);
      state.total = action.payload.total;
    },
    getAnalyticETHSuccess(state, action) {
      state.isLoading = false;
      state.deposit = [];
      state.labels = [];
      state.withdraw = [];
      // eslint-disable-next-line array-callback-return
      action.payload.map((row) => {
        state.deposit.push(row.deposit);
        state.withdraw.push(row.withdraw);
        state.labels.push(row.label);
      });
    },
    getDashboardTrans(state, action) {
      state.isLoading = false;
      const commission = {
        name: 'Commission',
        value: action.payload.commission
      };
      const totalBet = {
        name: 'Total Bet',
        value: action.payload.totalBet
      };
      const balance = {
        name: 'Balance',
        value: action.payload.balance
      };
      const winLose = {
        name: 'Win/Lost',
        value: action.payload.winLose
      };
      const depoEth = {
        value: action.payload.deposit,
        icon: <Icon icon={arrowUpFill} color="#1877F2" width={32} height={32} />
      };
      const withdEth = {
        value: action.payload.withdraw,
        icon: (
          <Icon icon={arrowDownFill} color="#DF3E30" width={32} height={32} />
        )
      };
      const depoNaga = {
        value: action.payload.depositExchange,
        icon: <Icon icon={arrowUpFill} color="#1877F2" width={32} height={32} />
      };
      const withdNaga = {
        value: action.payload.withdrawExchange,
        icon: (
          <Icon icon={arrowDownFill} color="#DF3E30" width={32} height={32} />
        )
      };
      state.totalOther = [commission, totalBet, winLose, balance];
      state.totalEth = [depoEth, withdEth];
      state.totalNaga = [depoNaga, withdNaga];
    },
    // GET TRANSACTION
    getTotalSuccess(state, action) {
      state.isLoading = false;

      state.totalWETH = action.payload.totalWithdrawEth;
      state.totalDETH = action.payload.totalDepositEth;
      state.totalTransfer = action.payload.totalTransfer;
      state.totalCommission = action.payload.totalCommission;
    }
  }
});

// Reducer
export default slice.reducer;

// // Actions
// export const { onToggleFollow } = slice.actions;

// ----------------------------------------------------------------------

export function getTotalDashboard() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get('api/dashboard/get-total-week-recent');
      if (response.status === 200) {
        dispatch(slice.actions.getTotalSuccess(response.data));
      }
      // const data = {
      //   totalETH: 0,
      //   totalONE: 0,
      //   totalBET: 0,
      //   totalUser: 0
      // };
      // dispatch(slice.actions.getTotalSuccess(data));
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
      // dispatch(slice.actions.hasError(error));
    }
  };
}
export function getAnalyticsETH() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const accessToken = window.localStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await axios.get('api/dashboard/get-data-of-chart');
      if (response.status === 200) {
        dispatch(slice.actions.getAnalyticETHSuccess(response.data));
      }
      // const data = {
      //   deposit: [0.01, 0.01, 0.01, 0.03, 0.02, 0.02, 0.09],
      //   withdraw: [0.02, 0.01, 0.06, 0.04, 0.05, 0.07, 0.1],
      //   labels: ['25/7', '26/7', '27/7', '28/7', '29/7', '30/7', '31/7']
      // };
      // dispatch(slice.actions.getAnalyticETHSuccess(data));
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
      // dispatch(slice.actions.hasError(error));
    }
  };
}
export function getTransactionInvoice(username, skip, take) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      skip *= take;
      const response = await axios.get('api/transaction', {
        params: {
          username,
          skip,
          take
        }
      });
      if (skip === 0) {
        dispatch(slice.actions.getInvoice(response.data));
      } else {
        dispatch(slice.actions.getInvoiceMore(response.data));
      }
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
export function getTopUser(username) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('api/dashboard/get-top-5-user', {
        params: {
          username
        }
      });
      dispatch(slice.actions.getUser(response.data));
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
// export function getTopUser(username, skip, take) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());

//     try {
//       skip *= take;
//       const response = await axios.get('api/dashboard/get-top-5-user', {
//         params: {
//           username,
//           skip,
//           take
//         }
//       });
//       dispatch(slice.actions.getUser(response.data));
//       // if (skip === 0) {
//       //   dispatch(slice.actions.getUser(response.data));
//       // } else {
//       //   dispatch(slice.actions.getInvoiceMore(response.data));
//       // }
//     } catch (error) {
//       dispatch(
//         getInitialize({
//           isAuthenticated: false,
//           user: null
//         })
//       );
//     }
//   };
// }
export function getTransactionSummary(username, skip, take) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      skip *= take;
      const response = await axios.get('api/transaction/summary', {
        params: {
          username,
          skip,
          take
        }
      });
      if (skip === 0) {
        dispatch(slice.actions.getSummaryTrans(response.data));
      } else {
        dispatch(slice.actions.getSummaryTransMore(response.data));
      }
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
export function getTransactionTotal(username, type, skip, take) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      skip *= take;
      const response = await axios.get('api/transaction', {
        params: {
          username,
          type,
          skip,
          take
        }
      });
      if (skip === 0) {
        dispatch(slice.actions.getTotalTrans(response.data));
      } else {
        dispatch(slice.actions.getTotalTransMore(response.data));
      }
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
export function getTotals() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axios.get('api/dashboard');
      dispatch(slice.actions.getDashboardTrans(response.data));
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
export function getTransactionsbyUsername(username, pagesize, paging, key) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      paging *= pagesize;
      const skip = paging;
      const take = pagesize;
      const type = key;
      const response = await axios.get(
        'api/transaction/get-tran-user-by-type',
        {
          params: {
            username,
            type,
            skip,
            take
          }
        }
      );
      if (skip === 0) {
        dispatch(slice.actions.getSuccessTransactionByUserName(response.data));
      } else {
        dispatch(slice.actions.getMoreTransactionByUserName(response.data));
      }
    } catch (ex) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
// export function exportExcelEthByPeriod(period) {
//   // eslint-disable-next-line consistent-return
//   return async (dispatch) => {
//     try {
//       console.log(period);
//       const response = await axios.post(
//         '/api/trans/Export-Eth-Period',
//         {
//           period
//         },
//         {
//           responseType: 'blob'
//         }
//       );
//       const mediaType =
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
//       const blob = new Blob([response.data], { type: mediaType });
//       const filename = `${period}_TransactionETH.xlsx`;
//       FileSaver.saveAs(blob, filename);
//     } catch (error) {
//       dispatch(
//         getInitialize({
//           isAuthenticated: false,
//           user: null
//         })
//       );
//     }
//   };
