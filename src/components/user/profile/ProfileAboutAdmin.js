import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
import WalleIcon from '@material-ui/icons/AccountBalanceWallet';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  IconButton,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Tooltip,
  Fade
} from '@material-ui/core';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

const IconButtonStyle = styled(IconButton)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  marginLeft: 10,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

const cliTruncate = require('cli-truncate');
// ----------------------------------------------------------------------

ProfileAboutAdmin.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function ProfileAboutAdmin({ profile, sx }) {
  const { email, Address, affiliate } = profile;
  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader title="Detail" />

      <CardContent>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={emailFill} />
          <Typography variant="body2">
            {email}
            <CopyToClipboard text={email}>
              <IconButtonStyle>
                <CopyIcon fontSize="small" />
              </IconButtonStyle>
            </CopyToClipboard>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <WalleIcon class="css-a5ayf2" fill="currentcolor" />
          <Typography variant="body2" data-tip data-for="registerTip">
            {Address === null ? null : (
              <Tooltip
                title={Address}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                arrow
              >
                <span>{cliTruncate(Address, 30)}</span>
              </Tooltip>
            )}
          </Typography>

          {Address === null ? null : (
            <CopyToClipboard text={Address}>
              <IconButtonStyle>
                <CopyIcon fontSize="small" />
              </IconButtonStyle>
            </CopyToClipboard>
          )}
        </Box>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <PeopleAltIcon class="css-a5ayf2" fill="currentcolor" />
          <Typography variant="body2">
            Affiliate: &nbsp;
            <a
              href={`${affiliate}`}
              component="span"
              variant="subtitle2"
              color="text.primary"
            >
              {affiliate}
            </a>
          </Typography>
        </Box>
        {/* 
        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            {role} at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {company}
            </Link>
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', mt: 2 }}>
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
}
