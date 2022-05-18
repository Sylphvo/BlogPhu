// import * as React from 'react';
// import Button from '@material-ui/core/Button';
// import { filter } from 'lodash';
// import { useState, useEffect } from 'react';
// import { useSnackbar } from 'notistack';
// import { sentenceCase } from 'change-case';
// import { useDispatch, useSelector } from 'react-redux';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Icon } from '@iconify/react';
// import CheckIcon from '@material-ui/icons/Check';
// import closeFill from '@iconify/icons-eva/close-fill';
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
//   TableContainer,
//   TablePagination,
//   IconButton,
//   DialogTitle,
//   Tooltip,
//   Fade,
//   Dialog,
//   TextField,
//   DialogActions,
//   DialogContent,
//   DialogContentText
// } from '@material-ui/core';
// import { MIconButton } from '../components/@material-extend';
// // redux
// import { getRollback } from '../redux/slices/transaction';
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
// const IconButtonStyle = styled(IconButton)(({ theme }) => ({
//   width: 20,
//   height: 20,
//   marginTop: 1,
//   marginLeft: 10,
//   flexShrink: 0,
//   marginRight: theme.spacing(2)
// }));

// const cliTruncate = require('cli-truncate');
// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'code', label: 'Code', alignRight: false },
//   { id: 'Username', label: 'Username', alignRight: false },
//   { id: 'Ethereum', label: 'Ethereum', alignRight: false },
//   { id: 'Amount', label: 'Amount', alignRight: false },
//   { id: 'RollbackId', label: 'RollbackId', alignRight: false },
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
//       (transactions) =>
//         transactions.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
//     );
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// export default function NewRollbackList() {
//   const theme = useTheme();
//   const dispatch = useDispatch();
//   const { confirmRollback } = useAuth();
//   const { transRollBack, issuccessful, totalRollBack } = useSelector(
//     (state) => state.transaction
//   );
//   const [pageindex, setPage] = useState(0);
//   const [paging, setPagging] = useState(0);
//   const [order, setOrder] = useState('asc');
//   const [orderBy, setOrderBy] = useState('username');
//   const [key, setFilterName] = useState('');
//   const [pagesize, setRowsPerPage] = useState(10);
//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const [open, setOpen] = React.useState(false);

//   useEffect(() => {
//     dispatch(getRollback(key, 'New', pagesize, pageindex));
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [dispatch, pagesize, paging]);

//   const handleConfirmRollback = (transId, username) => {
//     confirmRollback('admin', transId, username).then((e) => {
//       if (e) {
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
//     if (newPage % 3 === 0 && transRollBack.length <= (newPage + 3) * pagesize) {
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
//       ? Math.max(0, (1 + pageindex) * pagesize - transRollBack.length)
//       : 0;

//   const filteredTransactions = applySortFilter(
//     transRollBack,
//     getComparator(order, orderBy),
//     key
//   );

//   return (
//     <Page title="Transaction: List | Naga Casino">
//       <Container maxWidth="xl">
//         {totalRollBack !== -1 ? (
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
//                     rowCount={transRollBack.length}
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
//                           rollbackId,
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
//                             <TableCell align="left">{amount}</TableCell>
//                             <TableCell align="left">
//                               {rollbackId === null ? null : (
//                                 <Tooltip
//                                   title={
//                                     <CopyToClipboard text={rollbackId}>
//                                       <span>{rollbackId}</span>
//                                     </CopyToClipboard>
//                                   }
//                                   TransitionComponent={Fade}
//                                   TransitionProps={{ timeout: 600 }}
//                                   arrow
//                                 >
//                                   <span>{cliTruncate(rollbackId, 15)}</span>
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
//                               <IconButtonStyle onClick={handleClickOpen}>
//                                 <CheckIcon fontSize="small" />
//                               </IconButtonStyle>
//                               {/* <IconButtonStyle>
//                                 <CloseIcon fontSize="small" />
//                               </IconButtonStyle> */}
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
//                                     Confirm
//                                   </Typography>
//                                 </DialogTitle>
//                                 <DialogContent>
//                                   <DialogContentText
//                                     sx={{ mb: 3 }}
//                                     id="cancel-trans"
//                                     variant="h5"
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
//                                     label="Created Time"
//                                     value={createdTime}
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
//                                       handleConfirmRollback(id, username);
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
//                   {totalRollBack === 0 && (
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
//               count={totalRollBack}
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
