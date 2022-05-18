/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
// material
import {
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
  const { value, name } = site;

  return (
    <Grid item xs={6}>
      <Paper variant="outlined" sx={{ py: 2.5, textAlign: 'center' }}>
        <Typography variant="h5">{fShortenNumber(value)}</Typography>
        <Typography variant="subtitle2" sx={{ mb: '0.15rem' }}>
          {name}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default function AnalyticsItem2({ value }) {
  return (
    <Card>
      <CardHeader title="Other" sx={{ textAlign: 'center' }} />
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
