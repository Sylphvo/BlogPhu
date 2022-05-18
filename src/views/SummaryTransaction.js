import { filter } from 'lodash';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import {
  experimentalStyled as styled,
  useTheme
} from '@material-ui/core/styles';
import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Grid,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
// redux
import { getTransactionSummary, getTotals } from '../redux/slices/transaction';
// // routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import HeaderDashboard from '../components/HeaderDashboard';
import Label from '../components/Label';
import { DefaultTableHead } from '../components/transaction/default';
import {
  AnalyticsETH,
  AnalyticsNaga,
  AnalyticsItem2
} from '../components/general/analytics';
import { UserListToolbar } from '../components/user/list';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'username', label: 'USER', alignRight: false },
  { id: 'balance', label: 'BALANCE', alignRight: false },
  { id: 'deposit', label: 'DEPOSIT ETH', alignRight: false },
  { id: 'withdraw', label: 'WITHDRAW ETH', alignRight: false },
  { id: 'depositExchange', label: 'DEPOSIT NAGA', alignRight: false },
  { id: 'withdrawExchange', label: 'WITHDRAW NAGA', alignRight: false },
  { id: 'commission', label: 'COMMISSION', alignRight: false },
  { id: 'winLose', label: 'WIN/LOST', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));
function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  if (query) {
    return filter(
      array,
      (summaryTrans) =>
        summaryTrans.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SummaryTransaction() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const {
    summaryTrans,
    totalSummaryTrans,
    totalOther,
    totalEth,
    totalNaga
  } = useSelector((state) => state.transaction);
  const [skip, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const [username, setFilterName] = useState(null);
  const [take, setRowsPerPage] = useState(50);
  useEffect(() => {
    dispatch(getTotals());
    dispatch(getTransactionSummary(username, skip, take));
  }, [dispatch, username, take, skip]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    // if (newPage % 3 === 0 && summaryTrans.length <= (newPage + 3) * take) {
    //   setPagging(newPage + 2);
    // }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (username !== null) {
      setPage(0);
    }
    setFilterName(event.target.value);
  };

  const emptyRows =
    skip > 0 ? Math.max(0, (1 + skip) * take - summaryTrans.length) : 0;

  const filteredTransactions = applySortFilter(
    summaryTrans,
    getComparator(order, orderBy),
    username
  );
  // Event click row in table
  const history = useHistory();
  const handleRowClick = (row) => {
    console.log(1);
    history.location.pathname = '/dashboard/user/';
    history.push(`profile/${row.username}`);
  };
  //
  return (
    <Page title="Transaction: List | Naga Casino">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Summary List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Transaction', href: PATH_DASHBOARD.transaction.root },
            { name: 'Summary List' }
          ]}
        />
        {/* <Box
          sx={{
            margin: theme.spacing(0, 0, 1, 0)
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsETH value={totalEth} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AnalyticsNaga value={totalNaga} />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <AnalyticsItem2 value={totalOther} />
            </Grid>
          </Grid>
        </Box> */}
        <Card>
          <UserListToolbar
            filterName={username}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {totalSummaryTrans !== -1 ? (
                <Table>
                  <DefaultTableHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={totalSummaryTrans}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredTransactions
                      .slice(skip * take, skip * take + take)
                      .map((row, index) => {
                        const {
                          username,
                          balance,
                          winLose,
                          commission,
                          income,
                          withdrawExchange,
                          deposit,
                          withdraw
                        } = row;
                        return (
                          <StyledTableRow
                            hover
                            key={username}
                            tabIndex={0}
                            role="checkbox"
                            onClick={() => handleRowClick(row)}
                            style={{
                              cursor: 'pointer'
                            }}
                          >
                            <TableCell align="left">
                              {skip * take + index + 1}
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Box
                                sx={{
                                  py: 2,
                                  display: 'flex',
                                  alignItems: 'center'
                                }}
                              >
                                <Typography variant="subtitle2" noWrap>
                                  <CopyToClipboard text={username}>
                                    <span>{username}</span>
                                  </CopyToClipboard>
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell align="left">{balance}</TableCell>
                            <TableCell align="left">{deposit}</TableCell>
                            <TableCell align="left">{withdraw}</TableCell>
                            <TableCell align="left">{income}</TableCell>
                            <TableCell align="left">
                              {withdrawExchange}
                            </TableCell>

                            <TableCell align="left">{commission}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant={
                                  theme.palette.mode === 'light'
                                    ? 'ghost'
                                    : 'filled'
                                }
                                color={
                                  (winLose > 0 && 'success') ||
                                  (winLose < 0 && 'error') ||
                                  'info'
                                }
                              >
                                {winLose}
                              </Label>
                            </TableCell>
                          </StyledTableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {totalSummaryTrans === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          <Box sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={username} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )}
                </Table>
              ) : (
                <Table>
                  <DefaultTableHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={TABLE_HEAD.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {[...Array(5)].map(() => (
                      // eslint-disable-next-line react/jsx-key
                      <TableRow hover tabIndex={-1} role="checkbox">
                        {TABLE_HEAD.map(() => (
                          // eslint-disable-next-line react/jsx-key
                          <TableCell align="left">
                            <Skeleton duration={2} delay={1} animation="wave" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[50, 100, 500]}
            component="div"
            count={totalSummaryTrans}
            rowsPerPage={take}
            page={skip}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
