import PropTypes from 'prop-types';
// material
import { Box, Card, Typography, CardContent, Divider } from '@material-ui/core';

ProfileFollowInfo5.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};
export default function ProfileFollowInfo5({ profile, sx }) {
  const { depositExchange, transfer, income } = profile;
  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardContent>
        <Box sx={{ display: 'flex' }}>
          {/* <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{depositExchange}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Deposit Exchange
            </Typography>
          </Box> */}
          {/* <Divider orientation="vertical" flexItem /> */}
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{transfer}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Transfer
            </Typography>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ width: '50%', textAlign: 'center' }}>
            <Typography variant="h4">{income}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Income
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
