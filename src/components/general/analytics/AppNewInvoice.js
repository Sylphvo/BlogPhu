/* eslint-disable no-unused-vars */
import { filter } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

// material
import {
  experimentalStyled as styled,
  useTheme
} from '@material-ui/core/styles';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  CardHeader,
  TableContainer,
  Tooltip,
  Fade
} from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { fDateTime } from '../../../utils/formatTime';
import { DefaultTableHead } from '../../transaction/default';

import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import Scrollbar from '../../Scrollbar';

import { getTransactionInvoice } from '../../../redux/slices/transaction';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'no', label: 'No', alignRight: false },
  { id: 'username', label: 'User Name', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'fee', label: 'Fee', alignRight: false },
  { id: 'txHash', label: 'txHash', alignRight: false },
  { id: 'fromAddress', label: 'From Address', alignRight: false },
  { id: 'toAddress', label: 'To Address', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'createTime', label: 'Create Time', alignRight: false }
];
const cliTruncate = require('../../../../node_modules/cli-truncate');

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
      (summaryInvoice) =>
        summaryInvoice.username.toLowerCase().indexOf(query.toLowerCase()) !==
        -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}
// ----------------------------------------------------------------------

export default function AppNewInvoice() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('username');
  const { summaryInvoice, totalSummaryInvoice } = useSelector(
    (state) => state.transaction
  );
  const [skip, setPage] = useState(0);
  const [username, setFilterName] = useState(null);
  const [take, setRowsPerPage] = useState(5);

  // effect
  useEffect(() => {
    dispatch(getTransactionInvoice(username, skip, take));
  }, [dispatch, username, take, skip]);

  // function

  // const handleClick = () => {};
  // Event click row in table
  const history = useHistory();
  const handleRowClick = (row) => {
    history.location.pathname = '/dashboard/user/';
    history.push(`profile/${row.username}`);
  };
  const emptyRows =
    skip > 0 ? Math.max(0, (1 + skip) * take - summaryInvoice.length) : 0;

  const filteredTransactions = applySortFilter(
    summaryInvoice,
    getComparator(order, orderBy),
    username
  );

  return (
    <Card>
      <CardHeader title="Transaction New" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <DefaultTableHead
              headLabel={TABLE_HEAD}
              rowCount={totalSummaryInvoice}
            />

            <TableBody>
              {filteredTransactions
                .slice(skip * take, skip * take + take)
                .map((row, index) => {
                  const {
                    username,
                    type,
                    amount,
                    fee,
                    txHash,
                    fromAddress,
                    toAddress,
                    status,
                    createdTime
                  } = row;
                  return (
                    <StyledTableRow
                      hover
                      key={username}
                      tabIndex={0}
                      role="checkbox"
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={() => handleRowClick(row)}
                    >
                      <TableCell align="left">
                        {skip * take + index + 1}
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
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
                            <span>{cliTruncate(txHash, 10)}</span>
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
                            <span>{cliTruncate(fromAddress, 10)}</span>
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
                            <span>{cliTruncate(toAddress, 10)}</span>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell align="left">{status}</TableCell>
                      <TableCell align="left">
                        {fDateTime(createdTime)}
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
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          component={RouterLink}
          to={PATH_DASHBOARD.transaction.list}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
