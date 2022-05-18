import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
//
import { BaseOptionChart } from '../../charts';
import { getAnalyticsETH } from '../../../redux/slices/transaction';
// ----------------------------------------------------------------------

export default function AnalyticsWebsiteVisits() {
  const dispatch = useDispatch();
  const { withdraw, deposit, labels } = useSelector(
    (state) => state.transaction
  );

  useEffect(() => {
    dispatch(getAnalyticsETH());
  }, [dispatch]);

  const CHART_DATA = [
    {
      name: 'deposit',
      type: 'area',
      data: deposit !== null ? deposit : []
    },
    {
      name: 'withdraw',
      type: 'area',
      data: withdraw !== null ? withdraw : []
    }
  ];

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [3, 3] },
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: { type: ['gradient', 'gradient'] },
    labels: labels !== null ? labels : [],
    xaxis: { type: 'string' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y} eth`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Ethereum Analytics" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={CHART_DATA}
          options={chartOptions}
          height={364}
        />
      </Box>
    </Card>
  );
}
