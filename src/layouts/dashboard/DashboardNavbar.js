import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Link as RouterLink } from 'react-router-dom';

// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, AppBar, Hidden, Toolbar, IconButton } from '@material-ui/core';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import LanguagePopover from './LanguagePopover';
import NotificationsPopover from './NotificationsPopover';
import MenuNavbarPopover from './MenuNavbar/MenuNavbarPopover';
import MenuNavbar from './MenuNavbar/MenuNavbar';
//

import { sidebarConfigNavbar } from './SidebarConfig';
import Logo from '../../components/Logo';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('lg')]: {
    // width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
  }
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar({ onOpenSidebar }) {
  return (
    <RootStyle>
      <ToolbarStyle>
        <Box sx={{ px: 0.5, py: 0.5 }}>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>

        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *:not(:first-of-type)': {
              ml: { xs: 1.5, sm: 2, lg: 3 }
            }
          }}
        >
          <Hidden lgUp>
            <MenuNavbarPopover />
          </Hidden>
          <Hidden lgDown>
            {sidebarConfigNavbar.map((list) => (
              <MenuNavbar list={list} key={list} />
            ))}
          </Hidden>

          <LanguagePopover />
          <NotificationsPopover />
          <Searchbar />
          <AccountPopover />
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
