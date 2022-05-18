import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import TimeIcon from '@material-ui/icons/TimerOutlined';
import WalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import CopyIcon from '@material-ui/icons/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import LockIcon from '@material-ui/icons/Lock';
import MoreVertIcon from '@material-ui/icons/Edit';
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
import { fDateTimeSuffix } from '../../../utils/formatTime';
// ----------------------------------------------------------------------

const WalletIconStyle = styled(WalletIcon)(({ theme }) => ({
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

ProfileAbout.propTypes = {
  profile: PropTypes.object,
  sx: PropTypes.object
};

export default function ProfileAbout({ profile, sx }) {
  const { createdTime, address, affiliate, isLimit, email } = profile;

  const [mailset, setEmail] = React.useState(email);
  const [affset, setAffilliate] = React.useState(affiliate);
  const [limitset, setLimit] = React.useState(isLimit);

  const [open1, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleAffChange = (event) => {
    setAffilliate(event.target.value);
  };
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };
  const handleClickOpen1 = () => {
    setOpen(true);
  };

  const handleClose1 = () => {
    setOpen(false);
    setOpen2(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title="Detail"
        action={
          <IconButtonStyle aria-label="settings" onClick={handleClickOpen1}>
            <MoreVertIcon fontSize="small" />
          </IconButtonStyle>
        }
      />

      <CardContent>
        <Box sx={{ display: 'flex', mt: 2 }}>
          <WalletIconStyle class="css-a5ayf2" fill="currentcolor" />
          <Typography variant="body2" sx={{ marginLeft: 1, marginRight: 1 }}>
            Adddress: &nbsp;
            {address === null ? null : (
              <Tooltip
                title={address}
                TransitionComponent={Fade}
                TransitionProps={{ timeout: 600 }}
                arrow
              >
                <span>{cliTruncate(address, 25)}</span>
              </Tooltip>
            )}
          </Typography>
          {address === null ? null : (
            <CopyToClipboard text={address}>
              <IconButtonStyle>
                <CopyIcon fontSize="small" />
              </IconButtonStyle>
            </CopyToClipboard>
          )}
        </Box>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <PeopleAltIcon class="css-a5ayf2" fill="currentcolor" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
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
        <Box sx={{ display: 'flex', mt: 1 }}>
          <LockIcon class="css-a5ayf2" fill="currentcolor" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Limit: &nbsp;
            {isLimit}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <TimeIcon class="css-a5ayf2" fill="currentcolor" />
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            Created Time: &nbsp; {fDateTimeSuffix(createdTime)}
          </Typography>
        </Box>
        <Dialog
          open={open1}
          onClose={handleClose1}
          aria-labelledby="form-dialog-title"
          fullWidth="true"
        >
          <DialogTitle id="form-dialog-title">Infomation</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              onChange={handleEmailChange}
              value={mailset}
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth="true"
              variant="standard"
            />
            <br />
            <TextField
              autoFocus
              onChange={handleAffChange}
              value={affset}
              margin="dense"
              id="affiliate"
              label="Affiliate"
              type="affiliate"
              fullWidth="true"
              variant="standard"
            />
            <br />
            <br />
            Limit:&nbsp; &nbsp;
            <Select
              autoFocus
              value={limitset}
              onChange={handleLimitChange}
              inputProps={{
                name: 'limit',
                id: 'limit'
              }}
            >
              <MenuItem value="0">0</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose1}>Cancel</Button>
            <Button onClick={handleClickOpen2}>Change</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure about that?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose2}>No</Button>
            <Button onClick={(handleClose2, handleClose1)} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </CardContent>
    </Card>
  );
}
