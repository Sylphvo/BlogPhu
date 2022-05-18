import { useState } from 'react';
// material
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { MButton } from '../@material-extend';

// ----------------------------------------------------------------------

export default function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MButton color="info" variant="outlined" onClick={handleClickOpen}>
        Submit
      </MButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Date</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            value='alertDate'
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Ok</Button>
          <Button onClick={handleClose} autoFocus>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
