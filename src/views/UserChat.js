// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';
// utils
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import { ChatWindowUser } from '../components/chat';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function UserChat() {
  return (
    <RootStyle title="Chat User | Naga-Chat">
      <HeaderStyle>
        <Logo />
      </HeaderStyle>

      <Container maxWidth="lg">
        <Box sx={{ mb: 5 }}>
          <Typography variant="h3" align="center" gutterBottom>
            Support page of Naga
          </Typography>
          <Typography align="center" sx={{ color: 'text.secondary' }}>
            If you need any help, please message us.
          </Typography>
        </Box>
        <ChatWindowUser />
      </Container>
    </RootStyle>
  );
}
