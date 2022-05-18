import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';
import { Box, Toolbar, OutlinedInput, InputAdornment } from '@material-ui/core';
// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: '20%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { width: '25%', boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

DefaultTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func
};

export default function DefaultTableToolbar({
  numSelected,
  filterName,
  onFilterName
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        placeholder="Search username..."
        startAdornment={
          <InputAdornment position="start">
            <Box
              component={Icon}
              icon={searchFill}
              sx={{ color: 'text.disabled' }}
            />
          </InputAdornment>
        }
      />
      {/* <Box
        sx={{
          width: '34%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: theme.spacing(0, 5, 1, 0)
        }}
      >
        <DatePicker
          views={['date']}
          label="from date"
          value={fromDate}
          onChange={onFromDate}
          renderInput={(params) => (
            <TextField {...params} margin="normal" helperText={null} />
          )}
        />
        <DatePicker
          views={['date']}
          label="to date"
          value={toDate}
          onChange={onToDate}
          renderInput={(params) => (
            <TextField {...params} margin="normal" helperText={null} />
          )}
        />
      </Box>
       */}
      <Box
        sx={{
          display: 'flex',
          padding: theme.spacing(0, 5, 1, 0)
        }}
      >
        <br />
      </Box>
    </RootStyle>
  );
}
