/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// material
import {
  Box,
  Grid,
  Card,
  Paper,
  Typography,
  CardHeader,
  CardContent
} from '@material-ui/core';
// utils
import { fShortenNumber2 } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

SiteItem.propTypes = {
  site: PropTypes.object
};

function SiteItem({ site }) {
  const { icon, value } = site;

  return (
    <Grid item xs={12}>
      <Paper variant="outlined" sx={{ py: 1.5, textAlign: 'center' }}>
        <Box sx={{ mb: 0.5 }}>{icon}</Box>
        <Typography variant="h5">{fShortenNumber2(value)}</Typography>
      </Paper>
    </Grid>
  );
}
export default function AnalyticsETH({ value }) {
  return (
    <Card>
      <CardHeader title="ETH" sx={{ textAlign: 'center' }} />
      <CardContent>
        <Grid container spacing={2}>
          {value.map((site) => (
            <SiteItem key={site.name} site={site} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
