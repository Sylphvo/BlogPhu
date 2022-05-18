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
// hooks
import useAuth from '../../hooks/useAuth';
// routes
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import { RegisterForm } from '../../components/authentication/register';
import AuthWithSocial from '../../components/authentication/AuthWithSocial';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

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

export default function Register() {
  const { method } = useAuth();

  return (
    <RootStyle title="Register | Naga-Admin">
      <Hidden mdDown>
        <SectionStyle>
          <img src="https://source.unsplash.com/collection/{1}" alt="login" />
        </SectionStyle>
      </Hidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Box sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Logo />
            <TextStyle>
              <Typography variant="h6" gutterBottom>
                Create Account Admin
              </Typography>
            </TextStyle>
          </Box>

          {method === 'firebase' && <AuthWithSocial />}

          <RegisterForm />

          <Typography
            variant="body2"
            align="center"
            sx={{ color: 'text.secondary', mt: 3 }}
          >
            By registering, I agree to Minimal&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
