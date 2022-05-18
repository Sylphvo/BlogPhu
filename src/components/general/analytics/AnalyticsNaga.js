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
import { fShortenNumber } from '../../../utils/formatNumber';

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
        <Typography variant="h5">{fShortenNumber(value)}</Typography>
      </Paper>
    </Grid>
  );
}

// eslint-disable-next-line react/prop-types
export default function AnalyticsNaga({ value }) {
  return (
    <Card>
      <CardHeader title="Naga" sx={{ textAlign: 'center' }} />
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
