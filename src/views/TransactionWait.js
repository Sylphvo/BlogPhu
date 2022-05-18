// import { capitalCase } from 'change-case';
// import { useState } from 'react';

// // material
// import { experimentalStyled as styled } from '@material-ui/core/styles';
// import { Tab, Box, Card, Tabs, Container } from '@material-ui/core';

// // routes
// import { PATH_DASHBOARD } from '../routes/paths';

// // components
// import Page from '../components/Page';
// import HeaderDashboard from '../components/HeaderDashboard';

// import TransactionWaitETH from './TransactionWaitETH';
// import TransactionWaitNaga from './TransactionWaitNaga';

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
// export default function TransactionWait() {
//   const [currentTab, setCurrentTab] = useState('eth');
//   const handleChangeTab = (event, newValue) => {
//     setCurrentTab(newValue);
//   };

//   const PROFILE_TABS = [
//     {
//       value: 'eth',
//       component: <TransactionWaitETH />
//     },
//     {
//       value: 'naga',
//       component: <TransactionWaitNaga />
//     }
//   ];

//   return (
//     <Page title="Transaction: List | Naga Casino">
//       <Container maxWidth="xl">
//         <HeaderDashboard
//           heading="Wait Withdraw List"
//           links={[
//             { name: 'Dashboard', href: PATH_DASHBOARD.root },
//             { name: 'Transaction', href: PATH_DASHBOARD.transaction.root },
//             { name: 'Wait Withdraw List' }
//           ]}
//         />
//         <Card
//           sx={{
//             mb: 3,
//             height: 50,
//             position: 'relative'
//           }}
//         >
//           <TabsWrapperStyle>
//             <Tabs
//               value={currentTab}
//               scrollButtons="auto"
//               variant="scrollable"
//               allowScrollButtonsMobile
//               onChange={handleChangeTab}
//             >
//               {PROFILE_TABS.map((tab) => (
//                 <Tab
//                   disableRipple
//                   key={tab.value}
//                   value={tab.value}
//                   icon={tab.icon}
//                   label={capitalCase(tab.value)}
//                 />
//               ))}
//             </Tabs>
//           </TabsWrapperStyle>
//         </Card>
//         {PROFILE_TABS.map((tab) => {
//           const isMatched = tab.value === currentTab;
//           return isMatched && <Box key={tab.value}>{tab.component}</Box>;
//         })}
//       </Container>
//     </Page>
//   );
// }
