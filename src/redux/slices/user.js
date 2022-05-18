import { map } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { getInitialize } from './authJwt';
import { GAME_URL } from '../../config';
// ----------------------------------------------------------------------

// const createId = (index) => `fc68bad5-d430-4033-b8f8-4bc069dc0ba0-${index}`;
const IPIFY_URL = 'https://libratech-ipify-api.azurewebsites.net';
// const GAME_URL = 'https://naga-game-api-dev.azurewebsites.net';
// const GAME_URL = 'https://naga-game-api.azurewebsites.net';
// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  myProfile: null,
  posts: [],
  users: [],
  totalUsers: 0,
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  cards: null,
  addressBook: [],
  invoices: [],
  notifications: null,
  url: null,
  hierarchyData: []
};
const users = [
  {
    id: '8864c717-587d-472a-929a-8e5f298024da-0',
    displayName: 'Administrator',
    email: 'admin@nagacasino.io',
    password: 'admin',
    photoURL:
      'https://gravatar.com/avatar/bc0d45e81052486d0ba68fb960a63690?s=400&d=robohash&r=x',
    phoneNumber: '+40 777666555',
    country: 'Viet Nam',
    address: '16 Cuu Long',
    state: 'Vietnam',
    city: 'Ho Chi Minh',
    zipCode: '94116',
    about: '',
    role: 'admin',
    isPublic: true
  }
];
const slice = createSlice({
  name: 'user',
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },
    // GET USERS
    getUrlSuccess(state, action) {
      state.isLoading = false;
      state.url = action.payload;
    },
    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.items;
      state.totalUsers = action.payload.total;
    },
    getUsersMore(state, action) {
      state.isLoading = false;
      state.users = state.users.concat(action.payload.items);
      state.totalUsers = action.payload.total;
    },
    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },
    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },

    // GET HIERARCHY
    getHierarchySuccess(state, action) {
      state.isLoading = false;
      state.hierarchyData = action.payload.hierarchyData;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile(key) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const username = key;
      const response = await axios.get('api/user/get-user-profile', {
        params: { username }
      });
      // const profile = {
      //   id: createId(1),
      //   cover: mockImgCover(1),
      //   position: 'UI Designer',
      //   follower: faker.datatype.number(),
      //   following: faker.datatype.number(),
      //   quote:
      //     'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
      //   country: faker.address.country(),
      //   email: faker.internet.email(),
      //   company: faker.company.companyName(),
      //   school: faker.company.companyName(),
      //   facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
      //   instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
      //   linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
      //   twitterLink: `https://www.twitter.com/caitlyn.kerluke`
      // };

      dispatch(slice.actions.getProfileSuccess(response.data));
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
      // dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserList() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axios.get('/api/user/manage-users');

      dispatch(slice.actions.getUserListSuccess(users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNotifications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/api/user/account/notifications-settings'
      );
      dispatch(
        slice.actions.getNotificationsSuccess(response.data.notifications)
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUsers(skip, take, key) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(2);
    try {
      const username = key;
      const email = key;
      skip *= take;
      const response = await axios.get('api/user', {
        params: { email, username, skip, take }
      });
      if (response.status === 200) {
        if (skip === 0) {
          dispatch(slice.actions.getUsersSuccess(response.data));
        } else {
          dispatch(slice.actions.getUsersMore(response.data));
        }
      }
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
      // dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLiveGame(username) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const pageCode = '103';
      const client = await axios.get(`${IPIFY_URL}/getip`);
      const clientIp = client.data;
      const response = await axios.post(`${GAME_URL}/api/app/direct-author`, {
        username,
        pageCode,
        clientIp
      });
      dispatch(slice.actions.getUrlSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

/* -------------------------------------------------------------------------- */
export function getHierarchy(Username) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
      const response = await axios.get(`api/user/get-hierarchy`, {
        params: { Username }
      });
      if (response.status === 200) {
        // has data
        if (response.data.data.hierarchyData !== null)
          dispatch(
            slice.actions.getHierarchySuccess({
              hierarchyData: response.data.data.hierarchyData.split(',')
            })
          );
        else
          dispatch(
            slice.actions.getHierarchySuccess({
              hierarchyData: []
            })
          );
      }
    } catch (error) {
      dispatch(
        getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
      // dispatch(slice.actions.hasError(error));
    }
  };
}
