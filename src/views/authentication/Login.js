import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Link,
  Hidden,
  Container,
  Typography
} from '@material-ui/core';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { LoginForm } from '../../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

// const HeaderStyle = styled('header')(({ theme }) => ({
//   top: 0,
//   zIndex: 9,
//   lineHeight: 0,
//   width: '100%',
//   display: 'flex',
//   alignItems: 'center',
//   position: 'absolute',
//   padding: theme.spacing(3),
//   justifyContent: 'space-between',
//   [theme.breakpoints.up('md')]: {
//     alignItems: 'flex-start',
//     padding: theme.spacing(7, 5, 0, 7)
//   }
// }));

const SectionStyle = styled(Card)(() => ({
  width: '100%',
  maxWidth: '75%',
  maxHeight: window.innerHeight,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius: 0
}));

const ContentStyle = styled('div')(() => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center'
}));
const TextStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
// ----------------------------------------------------------------------

export default function Login() {
  return (
    <RootStyle title="Login | Naga-Admin">
      <Hidden mdDown>
        <SectionStyle>
          <img src="https://source.unsplash.com/collection/{1}" alt="login" />
        </SectionStyle>
      </Hidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Logo />
              <TextStyle>
                <Typography variant="h6" gutterBottom>
                  Sign in to Naga Casino
                </Typography>
              </TextStyle>
            </Box>
            {/* <Tooltip title={method === 'firebase' ? 'Firebase' : 'JWT'}>
              <Box
                component="img"
                src={`/static/icons/${
                  method === 'firebase' ? 'ic_firebase' : 'ic_jwt'
                }.png`}
                sx={{ width: 32, height: 32 }}
              />
            </Tooltip> */}
          </Box>
          <LoginForm />

          <Hidden smUp>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              Don’t have an account?&nbsp;
              <Link
                variant="subtitle2"
                component={RouterLink}
                to={PATH_AUTH.register}
              >
                Get started
              </Link>
            </Typography>
          </Hidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
