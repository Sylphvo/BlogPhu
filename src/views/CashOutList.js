// import { filter } from 'lodash';
// import { useState, useEffect } from 'react';
// import { sentenceCase } from 'change-case';
// import { useDispatch, useSelector } from 'react-redux';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// // material
// import { useTheme } from '@material-ui/core/styles';
// import {
//   Box,
//   Card,
//   Table,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   TableContainer,
//   Tooltip,
//   Fade,
//   TablePagination
// } from '@material-ui/core';
// import Skeleton from '@material-ui/lab/Skeleton';
// // redux
// import { getTransactions } from '../redux/slices/transaction';
// // // routes
// import { PATH_DASHBOARD } from '../routes/paths';
// // components
// import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
// import HeaderDashboard from '../components/HeaderDashboard';
// import {
//   DefaultTableHead,
//   DefaultTableToolbar
// } from '../components/transaction/default';

// const cliTruncate = require('../../node_modules/cli-truncate');
// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'code', label: 'Code', alignRight: false },
//   { id: 'Username', label: 'Username', alignRight: false },
//   { id: 'EthBefore', label: 'EthBefore', alignRight: false },
//   { id: 'NagaBefore', label: 'NagaBefore', alignRight: false },
//   { id: 'Amount', label: 'Amount', alignRight: false },
//   { id: 'AmountExecute', label: 'AmountExecute', alignRight: false },
//   { id: 'Status', label: 'Date', alignRight: false },
//   { id: 'Date', label: 'Status', alignRight: false }
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(
//       array,
//       (transactions) =>
//         transactions.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// export default function CashOutList() {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { transCashOut, totalCashOut } = useSelector(
//     (state) => state.transaction
//   );
//   const [pageindex, setPage] = useState(0);
//   const [paging, setPagging] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('username');
//   const [key, setFilterName] = useState('');
//   const [pagesize, setRowsPerPage] = useState(10);

//   useEffect(() => {
//     dispatch(getTransactions(pagesize, pageindex, key, 'cash-out'));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, key, pagesize, paging]);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     if (newPage % 3 === 0 && transCashOut.length <= (newPage + 3) * pagesize) {
//       setPagging(newPage + 2);
//     }
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleFilterByName = (event) => {
//     if (key !== null) {
//       setPage(0);
//     }
//     setFilterName(event.target.value);
//   };

//   const emptyRows =
//     pageindex > 0
//       ? Math.max(0, (1 + pageindex) * pagesize - transCashOut.length)
//       : 0;

//   const filteredTransactions = applySortFilter(
//     transCashOut,
//     getComparator(order, orderBy),
//     key
//   );

//   return (
//     <Page title="Transaction: List | Naga Casino">
//       <Container maxWidth="xl">
//         <HeaderDashboard
//           heading="CashOut List"
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root },
//             { name: 'Transaction', href: PATH_DASHBOARD.transaction.root },
//             { name: 'CashOut List' }
//           ]}
//         />
//         {totalCashOut !== -1 ? (
//           <Card>
//             <DefaultTableToolbar
//               filterName={key}
//               onFilterName={handleFilterByName}
//             />

//             <Scrollbar>
//               <TableContainer sx={{ minWidth: 800 }}>
//                 <Table>
//                   <DefaultTableHead
//                     order={order}
//                     orderBy={orderBy}
//                     headLabel={TABLE_HEAD}
//                     rowCount={transCashOut.length}
//                     onRequestSort={handleRequestSort}
//                   />
//                   <TableBody>
//                     {filteredTransactions
//                       .slice(
//                         pageindex * pagesize,
//                         pageindex * pagesize + pagesize
//                       )
//                       .map((row) => {
//                         const {
//                           id,
//                           username,
//                           NagaBefore,
//                           amount,
//                           EthBefore,
//                           amountExecuted,
//                           createdTime,
//                           status
//                         } = row;
//                         return (
//                           <TableRow
//                             hover
//                             key={id}
//                             tabIndex={-1}
//                             role="checkbox"
//                           >
//                             <TableCell>
//                               {id === null ? null : (
//                                 <CopyToClipboard text={id}>
//                                   <Tooltip
//                                     title={id}
//                                     TransitionComponent={Fade}
//                                     TransitionProps={{ timeout: 600 }}
//                                     arrow
//                                   >
//                                     <span>
//                                       {cliTruncate(id.toUpperCase(), 8)}
//                                     </span>
//                                   </Tooltip>
//                                 </CopyToClipboard>
//                               )}
//                             </TableCell>
//                             <TableCell
//                               component="th"
//                               scope="row"
//                               padding="none"
//                             >
//                               <Box
//                                 sx={{
//                                   py: 2,
//                                   display: 'flex',
//                                   alignItems: 'center'
//                                 }}
//                               >
//                                 {/* <Box
//                                 component={Avatar}
//                                 alt={name}
//                                 src={avatarUrl}
//                                 sx={{ mx: 2 }}
//                               /> */}
//                                 <Typography variant="subtitle2" noWrap>
//                                   <CopyToClipboard text={username}>
//                                     <span>{username}</span>
//                                   </CopyToClipboard>
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell align="left">{EthBefore}</TableCell>
//                             <TableCell align="left">{NagaBefore}</TableCell>
//                             <TableCell align="left">{amount}</TableCell>
//                             <TableCell align="left">{amountExecuted}</TableCell>
//                             <TableCell align="left">{createdTime}</TableCell>
//                             <TableCell align="left">
//                               <Label
//                                 variant={
//                                   theme.palette.mode === 'light'
//                                     ? 'ghost'
//                                     : 'filled'
//                                 }
//                                 color={
//                                   (status === 'Failed' && 'error') ||
//                                   (status === 'Delete' && 'error') ||
//                                   (status === 'admin.cancel' && 'default') ||
//                                   (status === 'user.cancel' && 'default') ||
//                                   (status === 'Sent' && 'info') ||
//                                   (status === 'Wait' && 'info') ||
//                                   (status === 'New' && 'info') ||
//                                   'success'
//                                 }
//                               >
//                                 {sentenceCase(status)}
//                               </Label>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })}
//                     {emptyRows > 0 && (
//                       <TableRow style={{ height: 53 * emptyRows }}>
//                         <TableCell colSpan={6} />
//                       </TableRow>
//                     )}
//                   </TableBody>
//                   {totalCashOut === 0 && (
//                     <TableBody>
//                       <TableRow>
//                         <TableCell align="center" colSpan={6}>
//                           <Box sx={{ py: 3 }}>
//                             <SearchNotFound searchQuery={key} />
//                           </Box>
//                         </TableCell>
//                       </TableRow>
//                     </TableBody>
//                   )}
//                 </Table>
//               </TableContainer>
//             </Scrollbar>

//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={totalCashOut}
//               rowsPerPage={pagesize}
//               page={pageindex}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Card>
//         ) : (
//           <Card>
//             <DefaultTableToolbar
//               filterName={key}
//               onFilterName={handleFilterByName}
//             />
//             <Scrollbar>
//               <TableContainer sx={{ minWidth: 800 }}>
//                 <Table>
//                   <DefaultTableHead
//                     order={order}
//                     orderBy={orderBy}
//                     headLabel={TABLE_HEAD}
//                     rowCount={TABLE_HEAD.length}
//                     onRequestSort={handleRequestSort}
//                   />
//                   <TableBody>
//                     {[...Array(5)].map(() => (
//                       // eslint-disable-next-line react/jsx-key
//                       <TableRow hover tabIndex={-1} role="checkbox">
//                         {TABLE_HEAD.map(() => (
//                           // eslint-disable-next-line react/jsx-key
//                           <TableCell align="left">
//                             <Skeleton duration={2} delay={1} animation="wave" />
//                           </TableCell>
//                         ))}
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Scrollbar>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={TABLE_HEAD.length}
//               rowsPerPage={pagesize}
//               page={pageindex}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//           </Card>
//         )}
//       </Container>
//     </Page>
//   );
// }
