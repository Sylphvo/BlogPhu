import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, CardContent, Divider } from '@material-ui/core';

ProfileFollowInfo3.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};
export default function ProfileFollowInfo3({ profile, sx }) {
  const { deposit, withdrawExchange, withdraw } = profile;
  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{deposit}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Deposit
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          {/* <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{withdrawExchange}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Withdraw Exchange
            </Typography>
          </Box> */}
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{withdraw}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Withdraw
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
