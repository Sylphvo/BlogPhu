import PropTypes from 'prop-types';
// material
import { Box, Card, Divider, Typography, CardContent } from '@material-ui/core';
// utils

// ----------------------------------------------------------------------

ProfileFollowInfo4.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function ProfileFollowInfo4({ profile, sx }) {
  const { totalWin, winLose, totalChild } = profile;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5" paddingLeft="10px" paddingRight="10px">
              {totalWin}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Win
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5" paddingLeft="10px" paddingRight="10px">
              {winLose}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Win Lose
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5" paddingLeft="10px" paddingRight="10px">
              {totalChild}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Child
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
