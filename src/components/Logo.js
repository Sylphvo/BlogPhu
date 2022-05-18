// material
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------
const LogoStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
export default function Logo({ ...other }) {
  return (
    <LogoStyle>
      <Box
        component="img"
        alt="logo"
        src="/static/brand/logo.png"
        height={70}
        sx={{ height: { xs: 40, sm: 70, lg: 70 } }}
        {...other}
      />
    </LogoStyle>
  );
}
