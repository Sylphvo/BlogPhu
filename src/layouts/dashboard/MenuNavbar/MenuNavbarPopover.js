import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

import { useLocation, matchPath } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { List, ListSubheader } from '@material-ui/core';
import gridFill from '@iconify/icons-eva/grid-fill';
import gridOutline from '@iconify/icons-eva/grid-outline';

// hooks
import useAuth from '../../../hooks/useAuth';
// routes
// components
//
import MenuLinks from '../SidebarConfig';
import SidebarItem from '../SidebarItem';
import MenuPopover from '../../../components/MenuPopover';
import { MIconButton } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  margin: theme.spacing(1, 2.5, 5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));
// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level }) {
  const key = item.href + level;

  if (item.items) {
    const match = matchPath(pathname, {
      path: item.href,
      exact: false
    });

    return [
      ...array,
      <SidebarItem
        key={key}
        level={level}
        icon={item.icon}
        info={item.info}
        href={item.href}
        title={item.title}
        open={Boolean(match)}
      >
        {renderSidebarItems({
          pathname,
          level: level + 1,
          items: item.items
        })}
      </SidebarItem>
    ];
  }
  return [
    ...array,
    <SidebarItem
      key={key}
      level={level}
      href={item.href}
      icon={item.icon}
      info={item.info}
      title={item.title}
    />
  ];
}

function renderSidebarItems({ items, pathname, level = 0 }) {
  return (
    <List disablePadding>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }),
        []
      )}
    </List>
  );
}

MenuNavbarPopover.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function MenuNavbarPopover({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  /* -------------------------------------------------------------------------- */
  /*                                  function                                  */
  /* -------------------------------------------------------------------------- */
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //   Effect
  useEffect(() => {
    if (isOpenSidebar && onCloseSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContentMenuManagement = (
    <>
      {MenuLinks.map((list) => (
        <List
          // disablePadding
          key={list.subheader}
          // subheader={
          //   <ListSubheader
          //     disableSticky
          //     disableGutters
          //     sx={{
          //       mt: 3,
          //       mb: 2,
          //       pl: 5,
          //       color: 'text.primary',
          //       typography: 'overline'
          //     }}
          //   >
          //     {list.subheader}
          //   </ListSubheader>
          // }
        >
          {renderSidebarItems({
            items: list.items,
            pathname
          })}
        </List>
      ))}
    </>
  );

  const renderContent = (
    <>
      {MenuLinks.slice(1, 2).map((list) => (
        <>
          {renderSidebarItems({
            items: list.items.slice(0, 1),
            pathname
          })}
        </>
      ))}
    </>
  );

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        color={open ? 'primary' : 'default'}
      >
        <Icon icon={open ? gridOutline : gridFill} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 460 }}
      >
        {renderContentMenuManagement}
      </MenuPopover>
    </>
  );
}
