// import { capitalCase } from 'change-case';
// import { useState } from 'react';

// import { useSnackbar } from 'notistack';
// import { useDispatch, useSelector } from 'react-redux';
// import { DatePicker, LoadingButton } from '@material-ui/lab';
// // material

// import closeFill from '@iconify/icons-eva/close-fill';
// import { Icon } from '@iconify/react';
// import { experimentalStyled as styled } from '@material-ui/core/styles';
// import { Tab, Box, Card, Tabs, Container, TextField } from '@material-ui/core';
// import { format } from 'date-fns';
// import { useFormik } from 'formik';
// // routes
// import { PATH_DASHBOARD } from '../routes/paths';

// // components
// import Page from '../components/Page';
// import HeaderDashboard from '../components/HeaderDashboard';

// // import { exportExcelEthByPeriod } from '../redux/slices/transaction';
// import TransactionETH from './TransactionETH';
// import TransactionDeposit from './TransactionDeposit';

// import useIsMountedRef from '../hooks/useIsMountedRef';

// import { MIconButton } from '../components/@material-extend';
// // ----------------------------------------------------------------------

// const TabsWrapperStyle = styled('div')(({ theme }) => ({
//   zIndex: 9,
//   bottom: 0,
//   width: '100%',
//   display: 'flex',
//   position: 'absolute',
//   backgroundColor: theme.palette.background.paper,
//   [theme.breakpoints.up('sm')]: {
//     justifyContent: 'center'
//   },
//   [theme.breakpoints.up('md')]: {
//     justifyContent: 'flex-end',
//     paddingRight: theme.spacing(3)
//   }
// }));
// // ----------------------------------------------------------------------
// export default function TransactionPeriod() {
//   const [value, setValue] = useState(new Date());
//   const [currentTab, setCurrentTab] = useState('eth');
//   const handleChangeTab = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
//   const { totalEthPeriod, totalDepositPeriod } = useSelector(
//     (state) => state.transaction
//   );
//   console.log(totalEthPeriod + totalDepositPeriod);
//   const dispatch = useDispatch();
//   const isMountedRef = useIsMountedRef();
//   const formik = useFormik({
//     initialValues: {
//       datetime: value
//     },
//     validationSchema: null,
//     onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
//       try {
//         const period = format(new Date(value), 'yyyyMMdd');
//         if (new Date(value) > new Date()) {
//           enqueueSnackbar('Invalid date', {
//             variant: 'error',
//             action: (key) => (
//               <MIconButton size="small" onClick={() => closeSnackbar(key)}>
//                 <Icon icon={closeFill} />
//               </MIconButton>
//             )
//           });
//         } else {
//           // dispatch(exportExcelEthByPeriod(period));
//         }
//         if (isMountedRef.current) {
//           setSubmitting(false);
//         }
//       } catch (error) {
//         console.error(error);
//         resetForm();
//         if (isMountedRef.current) {
//           setSubmitting(false);
//           setErrors({ afterSubmit: error.code || error.message });
//         }
//       }
//     }
//   });
//   const PROFILE_TABS = [
//     {
//       value: 'eth',
//       component: <TransactionETH period={format(new Date(value), 'yyyyMMdd')} />
//     },
//     {
//       value: 'deposit',
//       component: (
//         <TransactionDeposit period={format(new Date(value), 'yyyyMMdd')} />
//       )
//     }
//   ];

//   return (
//     <Page title="Report: Transaction | Naga Casino">
//       <Container maxWidth="xl">
//         <HeaderDashboard
//           heading="Report Eth"
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root },
//             { name: 'Report', href: PATH_DASHBOARD.report.root },
//             { name: 'Transaction List' }
//           ]}
//         />
//         <form onSubmit={formik.handleSubmit}>
//           <Card
//             sx={{
//               mb: 3,
//               height: 170,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               paddingX: '1%'
//             }}
//           >
//             <DatePicker
//               views={['date']}
//               label="Date Transaction"
//               value={value}
//               onChange={(newValue) => {
//                 setValue(newValue);
//               }}
//               renderInput={(params) => (
//                 <TextField
//                   fullwidth
//                   {...params}
//                   margin="normal"
//                   helperText={null}
//                 />
//               )}
//             />
//             <Box
//               sx={{
//                 mb: 3,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'space-between'
//               }}
//             >
//               <LoadingButton
//                 type="submit"
//                 variant="contained"
//                 disabled={totalEthPeriod + totalDepositPeriod < 1}
//               >
//                 Export Excel
//               </LoadingButton>
//             </Box>
//             <TabsWrapperStyle>
//               <Tabs
//                 value={currentTab}
//                 scrollButtons="auto"
//                 variant="scrollable"
//                 allowScrollButtonsMobile
//                 onChange={handleChangeTab}
//               >
//                 {PROFILE_TABS.map((tab) => (
//                   <Tab
//                     disableRipple
//                     key={tab.value}
//                     value={tab.value}
//                     icon={tab.icon}
//                     label={capitalCase(tab.value)}
//                   />
//                 ))}
//               </Tabs>
//             </TabsWrapperStyle>
//           </Card>
//         </form>
//         {PROFILE_TABS.map((tab) => {
//           const isMatched = tab.value === currentTab;
//           return isMatched && <Box key={tab.value}>{tab.component}</Box>;
//         })}
//       </Container>
//     </Page>
//   );
// }
