import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { Avatar, Tooltip, Box } from '@mui/material';
import { toast } from 'react-toastify';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  // Error handling in case no messages are passed
  if (!messages) {
    toast.error('No messages available', { position: 'top-right' });
    return null;
  }

  return (
    <ScrollableFeed>
      {messages.map((m, i) => (
        <Box display="flex" key={m._id} sx={{ marginBottom: '10px' }}>
          {/* Display sender's avatar if they are the first message or last in sequence */}
          {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
            <Tooltip title={m.sender.name} placement="bottom-start" arrow>
              <Avatar
                alt={m.sender.name}
                src={m.sender.pic}
                sx={{
                  width: 35,
                  height: 35,
                  marginRight: 1,
                  marginTop: '7px',
                  boxShadow: 2, // Adds subtle shadow to the avatar
                }}
              />
            </Tooltip>
          )}

          {/* Message Bubble */}
          <Box
            component="span"
            sx={{
              backgroundColor: `${m.sender._id === user._id ? '#8EE3F8' : '#C2FFFF'}`,
              borderRadius: '20px',
              padding: '8px 20px',
              maxWidth: '75%',
              marginLeft: isSameSenderMargin(messages, m, i, user._id),
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              display: 'inline-block',
              wordBreak: 'break-word',
              boxShadow: 1, // Adds shadow for better contrast
            }}
          >
            {m.content}
          </Box>
        </Box>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
