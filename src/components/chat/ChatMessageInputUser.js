/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import roundSend from '@iconify/icons-ic/round-send';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Input,
  Divider,
  IconButton,
  InputAdornment
} from '@material-ui/core';
//
import EmojiPicker from '../EmojiPicker';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  minHeight: 56,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  paddingLeft: theme.spacing(2)
}));

// ----------------------------------------------------------------------

export default function ChatMessageInputUser({ sendMessage }) {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleSend();
    }
  };

  const handleSend = () => {
    if (!message) {
      return '';
    }
    sendMessage(message);
    return setMessage('');
  };

  return (
    <RootStyle>
      <Input
        fullWidth
        value={message}
        disableUnderline
        onKeyUp={handleKeyUp}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        startAdornment={
          <InputAdornment position="start">
            <EmojiPicker value={message} setValue={setMessage} />
          </InputAdornment>
        }
        endAdornment={
          <Box sx={{ flexShrink: 0, mr: 1.5, '& > *': { mx: 0.5 } }}>
            <IconButton size="small" onClick={handleAttach}>
              <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
            </IconButton>
            {/* <IconButton disabled={disabled} size="small" onClick={handleAttach}>
              <Icon icon={attach2Fill} width={24} height={24} />
            </IconButton>
            <IconButton disabled={disabled} size="small">
              <Icon icon={micFill} width={24} height={24} />
            </IconButton> */}
          </Box>
        }
        sx={{ height: '100%' }}
      />

      <Divider orientation="vertical" flexItem />

      <IconButton
        color="primary"
        disabled={!message}
        onClick={handleSend}
        sx={{ mx: 1 }}
      >
        <Icon icon={roundSend} width={24} height={24} />
      </IconButton>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </RootStyle>
  );
}
