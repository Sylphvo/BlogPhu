import PropTypes from 'prop-types';
// material
import { Box, Card, Divider, Typography, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function ProfileFollowInfo({ profile, sx }) {
  const { totalBet, systemBet, level } = profile;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5">{totalBet}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Total Bet
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5">{systemBet}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              System Bet
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h5">{level}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Level
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
