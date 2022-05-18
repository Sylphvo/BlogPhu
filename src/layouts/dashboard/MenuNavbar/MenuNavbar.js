import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

import { Link as RouterLink, useLocation, matchPath } from 'react-router-dom';
// material
import { List, Typography, ListSubheader, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';

// hooks
import arrowDownFill from '@iconify/icons-eva/arrow-down-fill';
import arrowUpOutline from '@iconify/icons-eva/arrow-up-outline';

import useAuth from '../../../hooks/useAuth';
//
// components
import SidebarItem from './DropdownMenu';
import MenuPopover from '../../../components/MenuPopover';
import { MIconButton } from '../../../components/@material-extend';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

// ----------------------------------------------------------------------

function reduceChild({ array, item, pathname, level, handleClose }) {
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
          items: item.items,
          handleClose
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

function renderSidebarItems({ items, pathname, level = 0, handleClose }) {
  return (
    <List disablePadding onClick={() => handleClose()}>
      {items.reduce(
        (array, item) => reduceChild({ array, item, pathname, level }),
        []
      )}
    </List>
  );
}

MenuNavbar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function MenuNavbar({ isOpenSidebar, onCloseSidebar, list }) {
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

  const renderContentMenuManagement = (list) => (
    <>
      <List
        disablePadding
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
          pathname,
          handleClose
        })}
      </List>
    </>
  );

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        color={
          matchPath(pathname, {
            path: list.href,
            exact: false
          })
            ? 'primary'
            : 'default'
        }
        sx={{
          borderRadius: '4px'
        }}
      >
        {!list.items ? (
          <Typography variant="h6">
            <RouterLink
              to={list.href}
              style={{ textDecoration: 'none', color: 'unset' }}
            >
              {list.title.charAt(0).toUpperCase() + list.title.slice(1)}
            </RouterLink>
          </Typography>
        ) : (
          <>
            <Box
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              spacing={0}
              display="flex"
            >
              <Typography variant="h6">
                {list.title.charAt(0).toUpperCase() + list.title.slice(1)}
              </Typography>
              <Icon
                icon={!open ? arrowDownFill : arrowUpOutline}
                width={20}
                height={15}
              />
            </Box>
          </>
        )}
      </MIconButton>
      {/*  */}
      {list.items && (
        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: 220 }}
        >
          {renderContentMenuManagement(list)}
        </MenuPopover>
      )}
    </>
  );
}
