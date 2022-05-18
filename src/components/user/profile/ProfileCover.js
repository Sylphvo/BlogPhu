import PropTypes from 'prop-types';
// material
import {
  useTheme,
  alpha,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
// material

// components

import MyAvatar from '../../MyAvatar';
import Label from '../../Label';
// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    top: 0,
    zIndex: 9,
    width: '100%',
    content: "''",
    height: '100%',
    position: 'absolute',
    backdropFilter: 'blur(3px)',
    WebkitBackdropFilter: 'blur(3px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.primary.darker, 0.72)
  }
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3)
  }
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
  authUser: PropTypes.object
};

export default function ProfileCover({ myProfile, ...other }) {
  // const { status, position, cover } = myProfile;
  const { username, isActived } = myProfile;
  const theme = useTheme();

  return (
    <RootStyle {...other}>
      <InfoStyle>
        <MyAvatar
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 }
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' }
          }}
        >
          <Typography variant="h4">{username}</Typography>
          {/* <Typography sx={{ opacity: 0.72 }}>{position}</Typography> */}
          <Label
            variant={theme.palette.mode === 'light' ? 'filled' : 'ghost'}
            color={isActived ? 'success' : 'error'}
          >
            {isActived ? 'Active' : 'DeActive'}
          </Label>
        </Box>
      </InfoStyle>
      {/* <CoverImgStyle alt="profile cover" src={cover} /> */}
    </RootStyle>
  );
}
