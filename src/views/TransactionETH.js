// import * as React from 'react';
// import { filter } from 'lodash';
// import { useState, useEffect } from 'react';
// import { sentenceCase } from 'change-case';
// import { useDispatch, useSelector } from 'react-redux';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import CloseIcon from '@material-ui/icons/Close';
// import closeFill from '@iconify/icons-eva/close-fill';
// import { Icon } from '@iconify/react';
// import { useSnackbar } from 'notistack';
// // material
// import {
//   useTheme,
//   experimentalStyled as styled
// } from '@material-ui/core/styles';

// import Skeleton from '@material-ui/lab/Skeleton';
// import {
//   Box,
//   Card,
//   Table,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   IconButton,
//   TableContainer,
//   TablePagination,
//   Tooltip,
//   Fade,
//   Button,
//   Dialog,
//   TextField,
//   DialogTitle,
//   DialogActions,
//   DialogContent,
//   DialogContentText
// } from '@material-ui/core';
// import { MIconButton } from '../components/@material-extend';
// // redux
// import { getEthPeriod } from '../redux/slices/transaction';
// import useAuth from '../hooks/useAuth';
// // components
// import Page from '../components/Page';
// import Label from '../components/Label';
// import Scrollbar from '../components/Scrollbar';
// import SearchNotFound from '../components/SearchNotFound';
// import {
//   DefaultTableHead,
//   DefaultTableToolbar
// } from '../components/transaction/default';
// import { varFadeInUp } from '../components/animate/variants';
// // ----------------------------------------------------------------------
// const cliTruncate = require('cli-truncate');

// const IconButtonStyle = styled(IconButton)(({ theme }) => ({
//   width: 20,
//   height: 20,
//   marginTop: 1,
//   marginLeft: 10,
//   flexShrink: 0,
//   marginRight: theme.spacing(2)
// }));

// const TABLE_HEAD = [
//   { id: 'code', label: 'Code', alignRight: false },
//   { id: 'Username', label: 'Username', alignRight: false },
//   { id: 'Ethereum', label: 'Ethereum', alignRight: false },
//   { id: 'Amount', label: 'Amount', alignRight: false },
//   { id: 'ToAddress', label: 'ToAddress', alignRight: false },
//   { id: 'Date', label: 'Date', alignRight: false },
//   { id: 'Status', label: 'Status', alignRight: false },
//   { id: '' }
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
//       (transWaitEth) =>
//         transWaitEth.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// // eslint-disable-next-line react/prop-types
// export default function WithdrawEthList({ period }) {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { cancelTransaction } = useAuth();
//   const { reportEthPeriod, issuccessful, totalEthPeriod } = useSelector(
//     (state) => state.transaction
//   );
//   const [pageindex, setPage] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('username');
//   const [key, setFilterName] = useState('');
//   const [paging, setPagging] = useState(0);
//   const [pagesize, setRowsPerPage] = useState(10);
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const [open, setOpen] = React.useState(false);

//   useEffect(() => {
//     dispatch(getEthPeriod(key, period, 'eth', pagesize, pageindex));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, pagesize, paging, period]);

//   const handleCancelTransaction = (transId, username) => {
//     cancelTransaction('admin', transId, username).then((e) => {
//       if (e.issuccess === '1') {
//         enqueueSnackbar(e.message, {
//           variant: 'success',
//           action: (key) => (
//             <MIconButton size="small" onClick={() => closeSnackbar(key)}>
//               <Icon icon={closeFill} />
//             </MIconButton>
//           )
//         });
//       }
//       if (e.issuccess === '0') {
//         enqueueSnackbar(e.message, {
//           variant: 'error',
//           action: (key) => (
//             <MIconButton size="small" onClick={() => closeSnackbar(key)}>
//               <Icon icon={closeFill} />
//             </MIconButton>
//           )
//         });
//       }
//     });
//     return issuccessful;
//   };
//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleChangePage = (event, newPage) => {
//     if (
//       newPage % 3 === 0 &&
//       reportEthPeriod.length <= (newPage + 3) * pagesize
//     ) {
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
//       ? Math.max(0, (1 + pageindex) * pagesize - reportEthPeriod.length)
//       : 0;

//   const filteredTransactions = applySortFilter(
//     reportEthPeriod,
//     getComparator(order, orderBy),
//     key
//   );

//   return (
//     <Page title="Transaction: List | Naga Casino">
//       <Container maxWidth="xl">
//         {totalEthPeriod !== -1 ? (
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
//                     rowCount={reportEthPeriod.length}
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
//                           EthBefore,
//                           amount,
//                           toAddress,
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
//                                 <Typography variant="subtitle2" noWrap>
//                                   <CopyToClipboard text={username}>
//                                     <span>{username}</span>
//                                   </CopyToClipboard>
//                                 </Typography>
//                               </Box>
//                             </TableCell>
//                             <TableCell align="left">{EthBefore}</TableCell>
//                             <TableCell align="left">{amount}</TableCell>
//                             <TableCell align="left">
//                               {toAddress === null ? null : (
//                                 <Tooltip
//                                   title={
//                                     <CopyToClipboard text={toAddress}>
//                                       <span>{toAddress}</span>
//                                     </CopyToClipboard>
//                                   }
//                                   TransitionComponent={Fade}
//                                   TransitionProps={{ timeout: 600 }}
//                                   arrow
//                                 >
//                                   <span>{cliTruncate(toAddress, 25)}</span>
//                                 </Tooltip>
//                               )}
//                             </TableCell>
//                             <TableCell align="left">{createdTime}</TableCell>
//                             <TableCell align="left">
//                               <Label
//                                 variant={
//                                   theme.palette.mode === 'light'
//                                     ? 'ghost'
//                                     : 'filled'
//                                 }
//                                 color={
//                                   (status === ('Failed' || 'Delete') &&
//                                     'error') ||
//                                   'info'
//                                 }
//                               >
//                                 {sentenceCase(status)}
//                               </Label>
//                             </TableCell>
//                             <TableCell align="right">
//                               {/* <IconButtonStyle onClick={handleClickOpen}>
//                                 <CheckIcon fontSize="small" />
//                               </IconButtonStyle> */}
//                               <IconButtonStyle onClick={handleClickOpen}>
//                                 <CloseIcon fontSize="small" />
//                               </IconButtonStyle>
//                               {/* <Dialog
//                                 open={open}
//                                 onClose={handleClose}
//                                 maxWidth="sm"
//                                 PaperProps={{
//                                   sm: {
//                                     borderRadius: 1
//                                   },
//                                   ...varFadeInUp
//                                 }}
//                               >
//                                 <DialogTitle
//                                   style={{
//                                     fontWeight: 'bold',
//                                     fontSize: '22px'
//                                   }}
//                                 >
//                                   Confirm
//                                 </DialogTitle>
//                                 <DialogContent
//                                   sx={{ pb: 0, overflowY: 'unset' }}
//                                 >
//                                   <DialogContentText
//                                     id="confirm-trans"
//                                     sx={{ mb: 3 }}
//                                   >
//                                     Confirm this transaction?
//                                   </DialogContentText>
//                                   <TextField
//                                     fullWidth
//                                     multiline
//                                     maxRows={4}
//                                     label="Username"
//                                     value={username}
//                                     disabled
//                                     sx={{ mb: 3 }}
//                                   />
//                                   <TextField
//                                     fullWidth
//                                     multiline
//                                     maxRows={4}
//                                     label="Amount"
//                                     value={amount}
//                                     disabled
//                                     sx={{ mb: 3 }}
//                                   />

//                                   <TextField
//                                     fullWidth
//                                     multiline
//                                     maxRows={4}
//                                     label="ToAddress"
//                                     value={toAddress}
//                                     disabled
//                                     sx={{ mb: 3 }}
//                                   />
//                                 </DialogContent>
//                                 <DialogActions>
//                                   <Button
//                                     type="button"
//                                     variant="outlined"
//                                     color="inherit"
//                                     onClick={handleClose}
//                                   >
//                                     No
//                                   </Button>
//                                   <Button
//                                     variant="contained"
//                                     onClick={() => {
//                                       handleClose();
//                                       handleCancelTransaction(id, username);
//                                     }}
//                                   >
//                                     Yes
//                                   </Button>
//                                 </DialogActions>
//                               </Dialog>
//                              */}
//                               <Dialog
//                                 open={open}
//                                 onClose={handleClose}
//                                 maxWidth="sm"
//                                 PaperProps={{
//                                   sm: {
//                                     borderRadius: 1
//                                   },
//                                   ...varFadeInUp
//                                 }}
//                               >
//                                 <DialogTitle>
//                                   <Typography
//                                     variant="h4"
//                                     fontWeight="bold"
//                                     gutterBottom
//                                   >
//                                     Cancel
//                                   </Typography>
//                                 </DialogTitle>
//                                 <DialogContent>
//                                   <DialogContentText
//                                     sx={{ mb: 3 }}
//                                     id="cancel-trans"
//                                     variant="h5"
//                                   >
//                                     Cancel this transaction?
//                                   </DialogContentText>
//                                   <TextField
//                                     fullWidth
//                                     multiline
//                                     maxRows={4}
//                                     label="Username"
//                                     value={username}
//                                     disabled
//                                     sx={{ mb: 3 }}
//                                   />
//                                   <TextField
//                                     fullWidth
//                                     multiline
//                                     maxRows={4}
//                                     label="Amount"
//                                     value={amount}
//                                     disabled
//                                     sx={{ mb: 3 }}
//                                   />
//                                   <TextField
//                                     fullWidth
//                                     multiline
//                                     maxRows={4}
//                                     label="ToAddress"
//                                     value={toAddress}
//                                     disabled
//                                     sx={{ mb: 3 }}
//                                   />
//                                 </DialogContent>
//                                 <DialogActions>
//                                   <Button
//                                     type="button"
//                                     variant="outlined"
//                                     color="inherit"
//                                     onClick={handleClose}
//                                   >
//                                     No
//                                   </Button>
//                                   <Button
//                                     variant="contained"
//                                     onClick={() => {
//                                       handleClose();
//                                       handleCancelTransaction(id, username);
//                                     }}
//                                   >
//                                     Yes
//                                   </Button>
//                                 </DialogActions>
//                               </Dialog>
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
//                   {totalEthPeriod === 0 && (
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
//               count={totalEthPeriod}
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
