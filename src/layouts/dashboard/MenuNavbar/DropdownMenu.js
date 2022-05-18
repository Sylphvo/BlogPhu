import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Collapse,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';

// ----------------------------------------------------------------------

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  height: 48,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.secondary,
  '&.isActiveRoot': {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    )
  },
  '&.isActiveSub': {
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightMedium,
    '& .subIcon:before': {
      transform: 'scale(2)',
      backgroundColor: theme.palette.primary.main
    }
  }
}));

const SubIconStyle = styled('span')(({ theme }) => ({
  width: 22,
  height: 22,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:before': {
    width: 4,
    height: 4,
    content: "''",
    display: 'block',
    borderRadius: '50%',
    backgroundColor: theme.palette.text.disabled,
    transition: theme.transitions.create('transform')
  }
}));

// ----------------------------------------------------------------------

SidebarItem.propTypes = {
  level: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  info: PropTypes.element,
  icon: PropTypes.element,
  open: PropTypes.bool,
  children: PropTypes.node
};

export default function SidebarItem({
  level,
  title,
  href,
  info,
  icon,
  open = false,
  children
}) {
  const [show, setShow] = useState(open);
  const isSubItem = level > 0;

  const handleShow = () => {
    setShow((show) => !show);
  };

  if (children) {
    return (
      <>
        <Collapse in={1}>{children}</Collapse>
      </>
    );
  }

  return (
    <ListItemStyle
      button
      to={href}
      exact={open}
      disableGutters
      component={RouterLink}
      activeClassName={isSubItem ? 'isActiveSub' : 'isActiveRoot'}
      isActive={(match, location) => {
        if (!match) {
          return false;
        }

        const { url } = match;
        const { pathname } = location;
        const isMatch = url === pathname;

        if (!isSubItem) {
          return url.length && pathname.includes(url);
        }

        return isMatch;
      }}
    >
      <ListItemIcon>
        {isSubItem ? <SubIconStyle className="subIcon" /> : icon}
      </ListItemIcon>
      <ListItemText disableTypography primary={title} />

      {info && info}
    </ListItemStyle>
  );
}
