import { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog
} from '@material-ui/core';
import { Button } from 'react-scroll';
import PickerDate from '../components/pickers/PickerDate';
import HeaderDashboard from '../components/HeaderDashboard';
import { MButton } from '../components/@material-extend';
// // routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import Page from '../components/Page';
// import Card from 'src/theme/overrides/Card';

const ShowAlert = ({ data }) => {
  <p>{data}</p>;
};

export default function ReportEth() {
  const [state, setState] = useState(false);
  useEffect(() => {}, []);

  const onSubmit = (data) => {
    setState(true);
    if (state) {
      <ShowAlert data={data} />;
    }
  };

  return (
    <Page title="Report: Eth | Naga Casino">
      <Container maxWidth="xl">
        <HeaderDashboard
          heading="Report Eth"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Report', href: PATH_DASHBOARD.user.root },
            { name: 'Eth' }
          ]}
        />
        <Card sx={{ mb: 3 }}>
          <CardHeader title="Date picker" />
          <CardContent>
            <PickerDate onSubmit={onSubmit} />
            <MButton
              variant="contained"
              color="warning"
              sx={{ mb: 5 }}
              type="submit"
              onClick={onSubmit}
            >
              Submit
            </MButton>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
