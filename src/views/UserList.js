import { filter } from 'lodash';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Skeleton from '@material-ui/lab/Skeleton';
// material
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
// redux
import { getUsers } from '../redux/slices/user';
// // routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import HeaderDashboard from '../components/HeaderDashboard';
import { UserListHead, UserListToolbar } from '../components/user/list';

// ----------------------------------------------------------------------
const cliTruncate = require('../../node_modules/cli-truncate');

const TABLE_HEAD = [
  { id: 'stt', label: 'Stt', alignRight: false },
  { id: 'username', label: 'UserName', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'Address', label: 'AddressKey', alignRight: false },
  { id: 'affiliate', label: 'Affiliate', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false }
  // { id: 'isActived', label: 'Active', alignRight: false }
  // { id: '' }
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
  // stabilizedThis.sort((a, b) => {
  //   const order = comparator(a[0], b[0]);
  //   if (order !== 0) return order;
  //   return a[1] - b[1];
  // });
  if (query) {
    return filter(
      array,
      (users) =>
        users.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserList() {
  // const theme = useTheme();
  const dispatch = useDispatch();
  const { users, totalUsers } = useSelector((state) => state.user);
  const [skip, setPage] = useState(0);
  // const [paging, setPagging] = useState(0);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('CreatedTime');
  const [key, setFilterName] = useState('');
  const [take, setRowsPerPage] = useState(50);

  useEffect(() => {
    console.log(1);
    dispatch(getUsers(skip, take, key));
  }, [dispatch, key, skip, take]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleClick = () => {};
  // Event click row in table
  const history = useHistory();
  const handleRowClick = (row) => {
    history.push(`profile/${row.username}`);
  };
  //
  const handleChangePage = (event, newPage) => {
    // if (newPage % 3 === 0 && users.length <= (newPage + 3) * skip) {
    //   setPagging(newPage + 2);
    // }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    if (key !== null) {
      setPage(0);
    }
    setFilterName(event.target.value);
  };

  const emptyRows =
    skip > 0 ? Math.max(0, (1 + skip) * take - users.length) : 0;

  const filteredUsers = applySortFilter(
    users,
    getComparator(order, orderBy),
    key
  );

  return (
    <Page title="User: List | Naga Casino">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="User List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'List' }
          ]}
        />
        <Card>
          <UserListToolbar filterName={key} onFilterName={handleFilterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              {totalUsers !== -1 ? (
                <Table>
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users.length}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {filteredUsers
                      .slice(skip * take, skip * take + take)
                      .map((row, index) => {
                        const {
                          id,
                          username,
                          email,
                          address,
                          affiliate,
                          level
                        } = row;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            // onClick={(event) => handleClick(event, username)}
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
                            <TableCell align="left">
                              <CopyToClipboard text={email}>
                                <span>{email}</span>
                              </CopyToClipboard>
                            </TableCell>
                            <TableCell align="left">
                              {address === null ? (
                                'default'
                              ) : (
                                <Tooltip
                                  title={
                                    <CopyToClipboard text={address}>
                                      <span>{address}</span>
                                    </CopyToClipboard>
                                  }
                                  TransitionComponent={Fade}
                                  TransitionProps={{ timeout: 600 }}
                                  arrow
                                >
                                  <span>{cliTruncate(address, 25)}</span>
                                </Tooltip>
                              )}
                            </TableCell>
                            <TableCell align="left">{affiliate}</TableCell>
                            <TableCell align="left">{level}</TableCell>
                            {/* <TableCell align="right">
                              <IconButton href={`profile/${username}`}>
                                <Icon
                                  width={20}
                                  height={20}
                                  icon={moreVerticalFill}
                                />
                              </IconButton>
                            </TableCell> */}
                          </TableRow>
                        );
                      })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  {totalUsers === 0 && key.toString() !== '' && (
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
                  <UserListHead
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
            count={totalUsers}
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
