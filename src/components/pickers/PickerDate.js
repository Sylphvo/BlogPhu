import React, { useState } from 'react';
import isWeekend from 'date-fns/isWeekend';
// material
import { TextField, Grid } from '@material-ui/core';
import { DesktopDatePicker } from '@material-ui/lab';
// components
import Block from '../Block';

// ----------------------------------------------------------------------

export default function PickerDate(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState(new Date());

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Block title="Basic">
          <DesktopDatePicker
            label="For desktop"
            value={value}
            minDate={new Date('2021-01-01')}
            onChange={(newValue) => {
              setValue(newValue);
              onSubmit(newValue);
            }}
            renderInput={(params) => (
              <TextField {...params} fullWidth margin="normal" />
            )}
          />
        </Block>
      </Grid>
    </Grid>
  );
}
