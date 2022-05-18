/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
//
import Scrollbar from '../Scrollbar';
import ChatMessageItemUser from './ChatMessageItemUser';

// ----------------------------------------------------------------------

export default function ChatMessageListUser({ messages, username }) {
  const scrollRef = useRef();
  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.message]);

  return (
    <Scrollbar
      scrollableNodeProps={{ ref: scrollRef }}
      sx={{ p: 3, flexGrow: 1 }}
    >
      {messages.map((message) => (
        <ChatMessageItemUser
          key={message.id}
          message={message}
          username={username}
        />
      ))}
    </Scrollbar>
  );
}
