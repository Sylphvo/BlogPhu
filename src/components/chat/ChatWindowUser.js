import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// material
import { useParams } from 'react-router-dom';
import { Box, Divider } from '@material-ui/core';
// redux
import { joinRoom, sendMessages } from '../../redux/slices/chat';
//
import ChatMessageListUser from './ChatMessageListUser';
import ChatMessageInputUser from './ChatMessageInputUser';

// ----------------------------------------------------------------------

export default function ChatWindowUser() {
  const dispatch = useDispatch();
  // const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const [contentType, setContentType] = useState('text');
  const { connection, messages, conversationId } = useSelector(
    (state) => state.chat
  );
  // const username = new URLSearchParams(window.location.search).get('username');
  const { key } = useParams();
  const username = key;
  console.log(username, connection, messages);

  useEffect(() => {
    dispatch(joinRoom(username));
  }, [dispatch, username]);
  const sendMessage = (message) => {
    dispatch(
      sendMessages(message, connection, username, conversationId, contentType)
    );
  };
  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <ChatMessageListUser messages={messages} username={username} />
          <Divider />
          <ChatMessageInputUser sendMessage={sendMessage} />
        </Box>
      </Box>
    </Box>
  );
}
