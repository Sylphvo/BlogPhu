import { sub } from 'date-fns';
import { dotCase } from 'change-case';
import { sample } from 'lodash';

import { createSlice } from '@reduxjs/toolkit';
import faker from 'faker';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
// utils
import axios from '../../utils/axios';
import { mockImgFeed, mockImgAvatar } from '../../utils/mockImages';
import objFromArray from '../../utils/objFromArray';
import { URL_CHAT } from '../../config';
// ----------------------------------------------------------------------
// const URL_CHAT = 'https://libra-chat-api.azurewebsites.net/';
// const URL_CHAT = 'https://libra-chat-api-dev.azurewebsites.net/';
const initialState = {
  isLoading: false,
  error: false,
  connection: null,
  conversationId: null,
  messages: [],
  contacts: { byId: {}, allIds: [] },
  conversations: { byId: {}, allIds: [] },
  activeConversationId: null,
  participants: [],
  recipients: []
};

const slice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    hasMessage(state, action) {
      state.messages = [...state.messages, action.payload];
    },
    hasConnection(state, action) {
      state.connection = action.payload;
    },
    hasConversationId(state, action) {
      state.conversationId = action.payload;
    },
    // GET CONTACT SSUCCESS
    getContactsSuccess(state, action) {
      const contacts = action.payload;

      state.contacts.byId = objFromArray(contacts);
      state.contacts.allIds = Object.keys(state.contacts.byId);
    },

    // GET CONVERSATIONS
    getConversationsSuccess(state, action) {
      const conversations = action.payload;

      state.conversations.byId = objFromArray(conversations);
      state.conversations.allIds = Object.keys(state.conversations.byId);
    },

    // GET CONVERSATION
    getConversationSuccess(state, action) {
      const conversation = action.payload;

      if (conversation) {
        state.conversations.byId[conversation.id] = conversation;
        state.activeConversationId = conversation.id;
        if (!state.conversations.allIds.includes(conversation.id)) {
          state.conversations.allIds.push(conversation.id);
        }
      } else {
        state.activeConversationId = null;
      }
    },

    // ON SEND MESSAGE
    onSendMessage(state, action) {
      const conversation = action.payload;
      const {
        conversationId,
        messageId,
        message,
        contentType,
        attachments,
        createdAt,
        senderId
      } = conversation;

      const newMessage = {
        id: messageId,
        body: message,
        contentType,
        attachments,
        createdAt,
        senderId
      };

      state.conversations.byId[conversationId].messages.push(newMessage);
    },

    markConversationAsReadSuccess(state, action) {
      const { conversationId } = action.payload;
      const conversation = state.conversations.byId[conversationId];
      if (conversation) {
        conversation.unreadCount = 0;
      }
    },

    // GET PARTICIPANTS
    getParticipantsSuccess(state, action) {
      const participants = action.payload;
      state.participants = participants;
    },

    // RESET ACTIVE CONVERSATION
    resetActiveConversation(state) {
      state.activeConversationId = null;
    },

    addRecipients(state, action) {
      const recipients = action.payload;
      state.recipients = recipients;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  addRecipients,
  onSendMessage,
  resetActiveConversation
} = slice.actions;

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const createId = (index) => `8864c717-587d-472a-929a-8e5f298024da-${index}`;
const CONTACT_NAMES = [
  'Xander Purdy',
  'Genoveva Funk',
  'Sofia Funk',
  'Jody Osinski MD',
  'Augustine Jast',
  'Clyde Smitham',
  'Ottilie Heidenreich',
  'Camren Simonis',
  'Mrs. Sheldon Bartoletti',
  'Oswaldo Lockman',
  'Mr. Albin Little',
  'Daisy Dietrich',
  'Jarvis Sanford',
  'Patrick Rowe',
  'Kristy Lowe',
  'Toby Collier',
  'Birdie Howell',
  'Alverta Wuckert',
  'Charlotte Deckow',
  'Vivianne Frami',
  'Robin Grant',
  'Tavares Schneider',
  'Andreanne Bashirian'
];
const MY_CONTACT = {
  id: '8864c717-587d-472a-929a-8e5f298024da-0',
  avatar: '/static/mock-images/avatars/avatar_15.jpg',
  name: 'Jaydon Frankie',
  username: 'jaydon.frankie'
};
const contacts = [...Array(20)].map((_, index) => {
  const setIndex = index + 1;
  return {
    id: createId(setIndex),
    name: CONTACT_NAMES[setIndex],
    username: CONTACT_NAMES[setIndex] && dotCase(CONTACT_NAMES[setIndex]),
    avatar: mockImgAvatar(setIndex),
    address: faker.address.streetAddress(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    lastActivity: faker.time.recent(),
    status: sample(['online', 'offline', 'away', 'busy']),
    position: sample([
      'Leader',
      'Hr Manager',
      'UI Designer',
      'UX Designer',
      'UI/UX Designer',
      'Project Manager',
      'Backend Developer',
      'Full Stack Designer',
      'Front End Developer',
      'Full Stack Developer'
    ])
  };
});

const conversations = [
  {
    id: createId(1),
    participants: [MY_CONTACT, contacts[1]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [mockImgFeed(1)],
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [mockImgFeed(2)],
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['/static/mock-images/avatars/avatar_12.mp4'],
        createdAt: sub(new Date(), { minutes: 8 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [
          'https://mail.google.com/mail/u/file1.docx',
          'https://mail.google.com/mail/u/file2.xlsx',
          'https://mail.google.com/mail/u/file3.pptx'
        ],
        createdAt: sub(new Date(), { minutes: 6 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [
          'https://mail.google.com/mail/u/file4.pdf',
          'https://mail.google.com/mail/u/file5.psd',
          'https://mail.google.com/mail/u/file6.esp',
          'https://mail.google.com/mail/u/file7.sketch'
        ],
        createdAt: sub(new Date(), { minutes: 4 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        attachments: [],
        contentType: 'image',
        body: mockImgFeed(4),
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        contentType: 'text',
        body: faker.lorem.sentence(),
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 2 }),
        senderId: MY_CONTACT.id
      }
    ]
  },
  {
    id: createId(2),
    participants: [MY_CONTACT, contacts[2]],
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 8 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 6 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 4, minutes: 30 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2, minutes: 15 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1, minutes: 15 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: mockImgFeed(7),
        attachments: [],
        contentType: 'image',
        createdAt: sub(new Date(), { hours: 1 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 45 }),
        senderId: MY_CONTACT.id
      }
    ]
  },
  {
    id: createId(3),
    participants: [MY_CONTACT, contacts[3]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 8 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 6 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 4, minutes: 30 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2, minutes: 15 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1, minutes: 15 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: mockImgFeed(5),
        contentType: 'image',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1 }),
        senderId: contacts[3].id
      },
      {
        id: faker.datatype.uuid(),
        body: mockImgFeed(6),
        contentType: 'image',
        attachments: [],
        createdAt: sub(new Date(), { hours: 1 }),
        senderId: contacts[3].id
      }
    ]
  },
  {
    id: createId(4),
    participants: [MY_CONTACT, contacts[4]],
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 10 }),
        senderId: contacts[4].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { hours: 2 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 5 }),
        senderId: contacts[4].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 3 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[4].id
      }
    ]
  },
  {
    id: createId(5),
    participants: [MY_CONTACT, contacts[5]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[5].id
      }
    ]
  },
  {
    id: createId(6),
    participants: [MY_CONTACT, contacts[6]],
    type: 'ONE_TO_ONE',
    unreadCount: 2,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[6].id
      }
    ]
  },
  {
    id: createId(7),
    participants: [
      MY_CONTACT,
      contacts[1],
      contacts[2],
      contacts[4],
      contacts[3]
    ],
    type: 'GROUP',
    unreadCount: 5,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [
          mockImgFeed(1),
          mockImgFeed(2),
          mockImgFeed(3),
          mockImgFeed(4),
          'https://mail.google.com/mail/u/file1.docx'
        ],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 30 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file2.xlsx'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 29 }),
        senderId: contacts[1].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.psd'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 28 }),
        senderId: contacts[2].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.pptx'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 27 }),
        senderId: contacts[4].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.ai'],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 26 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: ['https://mail.google.com/mail/u/file3.mp4'],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[3].id
      }
    ]
  },
  {
    id: createId(8),
    participants: [MY_CONTACT, contacts[7]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[7].id
      }
    ]
  },
  {
    id: createId(9),
    participants: [MY_CONTACT, contacts[8]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[8].id
      }
    ]
  },
  {
    id: createId(10),
    participants: [MY_CONTACT, contacts[9]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[9].id
      }
    ]
  },
  {
    id: createId(11),
    participants: [
      MY_CONTACT,
      contacts[6],
      contacts[7],
      contacts[8],
      contacts[9],
      contacts[10]
    ],
    type: 'GROUP',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 30 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 29 }),
        senderId: contacts[9].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 28 }),
        senderId: contacts[10].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 27 }),
        senderId: contacts[8].id
      },
      {
        id: faker.datatype.uuid(),
        attachments: [],
        body: faker.lorem.sentence(),
        contentType: 'text',
        createdAt: sub(new Date(), { days: 3, hours: 2, minutes: 26 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[6].id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { days: 3 }),
        senderId: contacts[7].id
      }
    ]
  },
  {
    id: createId(12),
    participants: [MY_CONTACT, contacts[10]],
    type: 'ONE_TO_ONE',
    unreadCount: 0,
    messages: [
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: MY_CONTACT.id
      },
      {
        id: faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        contentType: 'text',
        attachments: [],
        createdAt: sub(new Date(), { minutes: 1 }),
        senderId: contacts[10].id
      }
    ]
  }
];
export function getConversations() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/conversations');
      dispatch(slice.actions.getConversationsSuccess(conversations));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getConversation(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/conversation', {
      //   params: { conversationKey }
      // });
      const conversation = conversations.find(
        (_conversationId) => _conversationId.id === conversationKey
      );
      dispatch(slice.actions.getConversationSuccess(conversation));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function markConversationAsRead(conversationId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // await axios.get('/api/chat/conversation/mark-as-seen', {
      //   params: { conversationId }
      // });
      const conversation = conversations.find(
        (_conversation) => _conversation.id === conversationId
      );
      if (conversation) {
        conversation.unreadCount = 0;
      }
      dispatch(slice.actions.markConversationAsReadSuccess({ conversationId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------
export function getContacts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/contacts');
      dispatch(slice.actions.getContactsSuccess(contacts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getParticipants(conversationKey) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/chat/participants', {
      //   params: { conversationKey }
      // });
      const participants = [];
      const conversation = conversations.find(
        (_conversationId) => _conversationId.id === conversationKey
      );
      if (conversation) {
        participants.push(...conversation.participants);
      } else {
        const contact = contacts.find(
          (_contact) => _contact.username === conversationKey
        );
        if (contact) {
          participants.push({
            id: contact.id,
            avatar: contact.avatar,
            name: contact.name,
            username: contact.username,
            address: contact.address,
            phone: contact.phone,
            email: contact.email,
            position: contact.position,
            status: contact.status,
            lastActivity: contact.lastActivity
          });
        }
      }
      dispatch(slice.actions.getParticipantsSuccess(participants));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function joinRoom(username) {
  return async (dispatch) => {
    try {
      const type = 'ONE-TO-ONE';
      const response = await axios.post(`${URL_CHAT}chat/create-conversation`, {
        type,
        username
      });
      const connection = new HubConnectionBuilder()
        .withUrl(`${URL_CHAT}chat`)
        .configureLogging(LogLevel.Information)
        .build();
      connection.on('ReceiveMessage', (username, message) => {
        console.log({ username, message });
        const id = faker.datatype.uuid();
        dispatch(slice.actions.hasMessage({ id, username, message }));
        // setMessages((messages) => [...messages, { id, username, message }]);
      });
      await connection.start();
      dispatch(addParticipant(connection, username, response));
      await connection.invoke('Welcome');
      dispatch(slice.actions.hasConnection(connection));
    } catch (error) {
      console.error(error);
    }
  };
}

export function addParticipant(connection, username, response) {
  return async (dispatch) => {
    const room = response.data.data.conversationId;
    dispatch(slice.actions.hasConversationId(room));
    await connection.invoke('JoinRoom', { username, room });

    response.data.data.admins.map(async (username) => {
      await connection.invoke('JoinRoom', { username, room });
    });
  };
}
export function sendMessages(
  message,
  connection,
  username,
  conversationId,
  contentType
) {
  return async () => {
    try {
      const body = message;
      const senderId = username;
      await axios.post(`${URL_CHAT}api/chat/create-message`, {
        body,
        contentType,
        senderId,
        conversationId
      });
      await connection.invoke('SendMessage', message);
    } catch (e) {
      console.log(e);
    }
  };
}
