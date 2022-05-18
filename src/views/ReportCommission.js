import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { sentenceCase } from 'change-case';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import { useTheme } from '@material-ui/core/styles';

import {
  Box,
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Tooltip,
  Fade
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
// redux
import { getTransactionTotal } from '../redux/slices/transaction';
// // routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import HeaderDashboard from '../components/HeaderDashboard';
import { fDateTime } from '../utils/formatTime';
import { DefaultTableHead } from '../components/transaction/default';
import { UserListToolbar } from '../components/user/list';

// ----------------------------------------------------------------------
const cliTruncate = require('cli-truncate');

const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'Amount', label: 'Amount', alignRight: false },
  { id: 'ToAddress', label: 'Fee', alignRight: false },
  { id: 'TxHash', label: 'TxHash', alignRight: false },
  { id: 'fromAddress', label: 'From Address', alignRight: false },
  { id: 'toAddress', label: 'To Address', alignRight: false },
  { id: 'Date', label: 'Date', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false }
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

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (totalList) =>
        totalList.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function ReportCommission() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { totalList, totalTrans } = useSelector((state) => state.transaction);
  const [skip, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [type, setType] = useState('commission');
  const [orderBy, setOrderBy] = useState('username');
  const [username, setFilterName] = useState(null);
  const [take, setRowsPerPage] = useState(50);

  useEffect(() => {
    dispatch(getTransactionTotal(username, type, skip, take));
  }, [dispatch, username, type, skip, take]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (username !== null) {
      setFilterName(null);
      setPage(0);
    }
    setType('commission');
    setFilterName(event.target.value);
  };
  const emptyRows =
    skip > 0 ? Math.max(0, (1 + skip) * take - totalList.length) : 0;

  const filteredTransactions = applySortFilter(
    totalList,
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
          heading="Commission List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Transaction', href: PATH_DASHBOARD.transaction.root },
            { name: 'Commission List' }
          ]}
        />
        <Card>
          <UserListToolbar
            filterName={username}
            onFilterName={handleFilterByName}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {totalTrans !== -1 ? (
                <Table>
                  <DefaultTableHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={totalList.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredTransactions
                      .slice(skip * take, skip * take + take)
                      .map((row, index) => {
                        const {
                          id,
                          username,
                          type,
                          amount,
                          fee,
                          txHash,
                          fromAddress,
                          toAddress,
                          createdTime,
                          status
                        } = row;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
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
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">{amount}</TableCell>
                            <TableCell align="left">{fee}</TableCell>
                            <TableCell align="left">
                              {txHash === null ? (
                                '------'
                              ) : (
                                <Tooltip
                                  title={
                                    <CopyToClipboard text={txHash}>
                                      <span>{txHash}</span>
                                    </CopyToClipboard>
                                  }
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 600 }}
                                  arrow
                                >
                                  <span>{cliTruncate(txHash, 15)}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {fromAddress === null ? (
                                '------'
                              ) : (
                                <CopyToClipboard text={fromAddress}>
                                  <Tooltip
                                    title={fromAddress}
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    arrow
                                  >
                                    <span>
                                      {cliTruncate(
                                        fromAddress.toUpperCase(),
                                        8
                                      )}
                                    </span>
                                  </Tooltip>
                                </CopyToClipboard>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {toAddress === null ? (
                                '------'
                              ) : (
                                <CopyToClipboard text={toAddress}>
                                  <Tooltip
                                    title={toAddress}
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    arrow
                                  >
                                    <span>
                                      {cliTruncate(toAddress.toUpperCase(), 8)}
                                    </span>
                                  </Tooltip>
                                </CopyToClipboard>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {fDateTime(createdTime)}
                            </TableCell>
                            <TableCell align="left">
                              <Label
                                variant={
                                  theme.palette.mode === 'light'
                                    ? 'ghost'
                                    : 'filled'
                                }
                                color={
                                  // (status ===
                                  //   ('Failed' || 'Delete' || 'Admin cancel') &&
                                  //   'error') ||
                                  // 'success'
                                  (status === 'Failed' && 'error') ||
                                  (status === 'Delete' && 'error') ||
                                  (status === 'admin.cancel' && 'default') ||
                                  (status === 'user.cancel' && 'default') ||
                                  (status === 'Sent' && 'info') ||
                                  (status === 'Wait' && 'info') ||
                                  (status === 'New' && 'info') ||
                                  'success'
                                }
                              >
                                {sentenceCase(status)}
                              </Label>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {totalTrans === 0 && (
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
            count={totalTrans}
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
