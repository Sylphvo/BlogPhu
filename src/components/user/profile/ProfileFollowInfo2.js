import PropTypes from 'prop-types';
// material
import { Box, Card, Divider, Typography, CardContent } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function ProfileFollowInfo({ profile, sx }) {
  const { lastDeposit, balance, commission } = profile;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5" paddingLeft="10px" paddingRight="10px">
              {balance}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Balance
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5" paddingLeft="10px" paddingRight="10px">
              {lastDeposit}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Last Deposit
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />

          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5" paddingLeft="10px" paddingRight="10px">
              {commission}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Commission
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
