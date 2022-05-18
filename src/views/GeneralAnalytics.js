// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// redux
// components
import Page from '../components/Page';
import {
  AnalyticsNewUsers,
  AnalyticsBugReports,
  AnalyticsItemOrders,
  AnalyticsWeeklySales,
  AppNewInvoice,
  AnalyticsWebsiteVisits,
  AppTopRelated
} from '../components/general/analytics';
import { getTotalDashboard } from '../redux/slices/transaction';
// ----------------------------------------------------------------------

export default function GeneralAnalytics() {
  const dispatch = useDispatch();
  const { totalWETH, totalDETH, totalTransfer, totalCommission } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getTotalDashboard());
  }, [dispatch]);

  return (
    <Page title="General: Analytics | Minimal-UI">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Hi, Welcome back</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6} sm={6} md={3}>
            <AnalyticsWeeklySales total={totalWETH} />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <AnalyticsNewUsers total={totalDETH} />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <AnalyticsItemOrders total={totalTransfer} />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <AnalyticsBugReports total={totalCommission} />
          </Grid>
          <Grid item xs={12} md={6} lg={8}>
            <AnalyticsWebsiteVisits />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <AppNewInvoice />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
