import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import {
  useTheme,
  experimentalStyled as styled,
  makeStyles,
  withStyles
} from '@material-ui/core/styles';
import {
  Box,
  Toolbar,
  OutlinedInput,
  FormControl,
  MenuItem,
  InputLabel,
  InputBase,
  Select,
  InputAdornment
} from '@material-ui/core';
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

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 18,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
    }
  }
}))(InputBase);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  }
}));
// ----------------------------------------------------------------------

DefauleTableToolbar2.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  type: PropTypes.string,
  onType: PropTypes.func
};
export default function DefauleTableToolbar2({
  numSelected,
  filterName,
  onFilterName,
  type,
  onType
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const classes = useStyles();
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
      <Box
        sx={{
          width: '34%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: theme.spacing(0, 1, 1, 0)
        }}
      >
        <FormControl
          className={classes.margin}
          sx={{
            width: '200px'
          }}
        >
          <InputLabel id="demo-customized-select-label">Type</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={type}
            onChange={onType}
            input={<BootstrapInput />}
          >
            <MenuItem value={null}>
              <em>None</em>
            </MenuItem>
            <MenuItem value="deposit">Deposit Eth</MenuItem>
            <MenuItem value="eth">Withdraw Eth</MenuItem>
            <MenuItem value="transfer">Withdraw Naga</MenuItem>
            <MenuItem value="income">Deposit Naga</MenuItem>
            <MenuItem value="commission">Commission</MenuItem>
          </Select>
        </FormControl>
      </Box>

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
