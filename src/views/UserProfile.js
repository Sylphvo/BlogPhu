import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundHistoryBox from '@iconify/icons-ic/round-history';
import roundMailBox from '@iconify/icons-ic/round-mail-outline';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Tab, Box, Card, Tabs, Container } from '@material-ui/core';
// redux
import { getProfile, getHierarchy } from '../redux/slices/user';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
// import useAuth from '../hooks/useAuth';
// components
import Page from '../components/Page';
import HeaderDashboard from '../components/HeaderDashboard';
import { MBreadcrumbs } from '../components/@material-extend';

import {
  Profile,
  ProfileCover,
  LiveGame,
  ComposeMailUser
} from '../components/user/profile';
import TransactionList from './TransactionList';

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  flexDirection: 'column',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'space-between'
  },
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(3)
  }
}));
// ----------------------------------------------------------------------
export default function UserProfile() {
  const dispatch = useDispatch();
  const { myProfile, hierarchyData } = useSelector((state) => state.user);
  // const { user } = useAuth();
  const { key } = useParams();
  const [currentTab, setCurrentTab] = useState('profile');
  const [listHierarchy, setListHierarchy] = useState([
    {
      name: key,
      href: `/dashboard/user/profile/${key}`
    }
  ]);

  /* -------------------------------------------------------------------------- */
  /*                                   effect                                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    dispatch(getProfile(key));
    dispatch(getHierarchy(key));
  }, [dispatch, key]);

  // transform data
  useEffect(() => {
    if (hierarchyData.length > 0) {
      const arr = [];

      hierarchyData.map((item) =>
        arr.push({
          name: item,
          href: `/dashboard/user/profile/${item}`
        })
      );
      console.log(hierarchyData, arr);
      setListHierarchy(arr);
    }
  }, [hierarchyData]);

  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */
  const handleChangeTab = (event, newValue) => {
    setCurrentTab(newValue);
  };

  if (!myProfile) {
    return null;
  }

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Icon icon={roundAccountBox} width={20} height={20} />,
      component: <Profile myProfile={myProfile} authUser={null} />
    },
    {
      value: 'transaction',
      icon: <LocalAtmIcon width={20} height={20} />,
      component: <TransactionList username={key} />
    },
    {
      value: 'history',
      icon: <Icon icon={roundHistoryBox} width={20} height={20} />,
      component: <LiveGame username={key} />
    },
    {
      value: 'Compose Email',
      icon: <Icon icon={roundMailBox} width={20} height={20} />,
      component: <ComposeMailUser profile={myProfile} />
    }
  ];

  return (
    <Page title="User: Profile | Naga Casino">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="User"
          links={[
            { name: 'User', href: PATH_DASHBOARD.root },
            { name: 'Profile', href: PATH_DASHBOARD.user.root },
            { name: myProfile.Username }
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 100,
            position: 'relative'
          }}
        >
          {/* <ProfileCover myProfile={myProfile} authUser={null} /> */}

          <TabsWrapperStyle>
            <Box
              sx={{
                ml: { md: 3 },
                mt: { xs: 1, md: 0 },
                color: 'common.white',
                textAlign: { xs: 'center', md: 'left' }
              }}
            >
              <MBreadcrumbs links={listHierarchy} />
            </Box>

            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={handleChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab
                  disableRipple
                  key={tab.value}
                  value={tab.value}
                  icon={tab.icon}
                  label={capitalCase(tab.value)}
                />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
