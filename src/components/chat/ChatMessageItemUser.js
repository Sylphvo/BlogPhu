/* eslint-disable react/prop-types */
import { formatDistanceToNowStrict } from 'date-fns';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(3)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 320,
  padding: theme.spacing(1.5),
  marginTop: theme.spacing(0.5),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral
}));

const InfoStyle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(0.75),
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function ChatMessageItemUser({ message, username }) {
  const senderDetails =
    // eslint-disable-next-line react/prop-types
    message.username === username
      ? { type: 'me' }
      : {
          avatar:
            'https://gravatar.com/avatar/89def65a6d1c5c3767e2cb7cbb873b06?s=400&d=robohash&r=x',
          // eslint-disable-next-line react/prop-types
          name: message.username
        };

  const isMe = senderDetails.type === 'me';

  return (
    <RootStyle>
      <Box
        sx={{
          display: 'flex',
          ...(isMe && {
            ml: 'auto'
          })
        }}
      >
        {senderDetails.type !== 'me' && (
          <Avatar
            alt={senderDetails.name}
            src={senderDetails.avatar}
            sx={{ width: 32, height: 32 }}
          />
        )}

        <Box sx={{ ml: 2 }}>
          <InfoStyle
            noWrap
            variant="caption"
            sx={{ ...(isMe && { justifyContent: 'flex-end' }) }}
          >
            {!isMe && `${senderDetails.name},`}&nbsp;
            {formatDistanceToNowStrict(new Date(), {
              addSuffix: true
            })}
          </InfoStyle>

          <ContentStyle
            sx={{
              ...(isMe && {
                color: 'grey.800',
                bgcolor: 'primary.lighter'
              })
            }}
          >
            <Typography variant="body2">{message.message}</Typography>
          </ContentStyle>
        </Box>
      </Box>
    </RootStyle>
  );
}
