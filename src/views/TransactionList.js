import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  TableContainer,
  TablePagination,
  Tooltip,
  Fade
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
// redux
// eslint-disable-next-line import/named
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getTransactionsbyUsername } from '../redux/slices/transaction';
// // routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import HeaderDashboard from '../components/HeaderDashboard';
import { DefaultTableHead } from '../components/transaction/default';
import { fDateTimeSuffix } from '../utils/formatTime';

const cliTruncate = require('../../node_modules/cli-truncate');

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Code', alignRight: false },
  { id: 'fromAddress', label: 'FromAddress', alignRight: false },
  { id: 'toAddress', label: 'ToAddress', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'fee', label: 'Fee', alignRight: false },
  { id: 'createdTime', label: 'Date', alignRight: false },
  { id: 'txHash', label: 'TxHash', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false }
];
const top100Films = [
  { title: 'all' },
  { title: 'cash-in' },
  { title: 'cash-out' },
  { title: 'commission' },
  { title: 'deposit' },
  { title: 'eth' },
  { title: 'naga+' },
  { title: 'naga-' },
  { title: 'rollback' }
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
      (transactions) =>
        transactions.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
// eslint-disable-next-line react/prop-types
export default function TransactionList({ username }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { transactions, total } = useSelector((state) => state.transaction);
  const [paging, setPagging] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdTime');
  const [key, setKey] = useState('');
  const [pagesize, setRowsPerPage] = useState(50);
  useEffect(() => {
    dispatch(getTransactionsbyUsername(username, pagesize, paging, key));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, username, pagesize, paging, key]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    // if (newPage % 3 === 0 && transactions.length <= (newPage + 3) * pagesize) {
    //   setPagging(newPage + 2);
    // }
    setPagging(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPagging(0);
  };

  const emptyRows =
    paging > 0 ? Math.max(0, (1 + paging) * pagesize - transactions.length) : 0;

  const filteredTransactions = applySortFilter(
    transactions,
    getComparator(order, orderBy),
    username
  );
  const onTagsChange = (event, value) => {
    if (value === null || value.title === 'all') {
      setKey('');
    } else {
      setKey(value.title);
    }
  };
  return (
    <Page title="Transaction: List | Naga Casino">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Transaction List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.transaction.root },
            { name: 'Transaction List' }
          ]}
        />
        <Card>
          {/* <DefaultTableToolbar
            filterName={key}
            onFilterName={handleFilterByName}
          /> */}
          <Autocomplete
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            style={{
              width: 300,
              marginTop: '10px',
              marginLeft: '10px',
              paddingTop: '10px',
              paddingBottom: '10px'
            }}
            onChange={onTagsChange}
            renderInput={(params) => (
              <TextField {...params} label="Select type" variant="outlined" />
            )}
          />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {total !== -1 ? (
                <Table>
                  <DefaultTableHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={transactions.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredTransactions
                      .slice(paging * pagesize, paging * pagesize + pagesize)
                      .map((row) => {
                        const {
                          amount,
                          createdTime,
                          fee,
                          fromAddress,
                          id,
                          status,
                          toAddress,
                          txHash,
                          type
                        } = row;
                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                          >
                            <TableCell align="left">
                              {id === null ? null : (
                                <Tooltip
                                  title={
                                    <CopyToClipboard text={id}>
                                      <span>{id}</span>
                                    </CopyToClipboard>
                                  }
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 600 }}
                                  arrow
                                >
                                  <span>{cliTruncate(id, 10)}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {fromAddress === null ? (
                                '------'
                              ) : (
                                <Tooltip
                                  title={
                                    <CopyToClipboard text={fromAddress}>
                                      <span>{fromAddress}</span>
                                    </CopyToClipboard>
                                  }
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 600 }}
                                  arrow
                                >
                                  <span>{cliTruncate(fromAddress, 25)}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left">
                              {toAddress === null ? (
                                '------'
                              ) : (
                                <Tooltip
                                  title={
                                    <CopyToClipboard text={toAddress}>
                                      <span>{toAddress}</span>
                                    </CopyToClipboard>
                                  }
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 600 }}
                                  arrow
                                >
                                  <span>{cliTruncate(toAddress, 25)}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left">{amount}</TableCell>
                            <TableCell align="left">{fee}</TableCell>
                            <TableCell align="left">
                              {fDateTimeSuffix(createdTime)}
                            </TableCell>
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
                                  <span>{cliTruncate(txHash, 10)}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left">{type}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant={
                                  theme.palette.mode === 'light'
                                    ? 'ghost'
                                    : 'filled'
                                }
                                color={
                                  (status === 'Duplicate' && 'warning') ||
                                  (status === 'Failed' && 'error') ||
                                  (status === 'Wait' && 'info') ||
                                  'success'
                                }
                              >
                                {status}
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
                  {total === 0 && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          <Box sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={key} />
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
              <TablePagination
                rowsPerPageOptions={[50, 250, 500]}
                component="div"
                count={total}
                rowsPerPage={pagesize}
                page={paging}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
