import jwtDecode from 'jwt-decode';
import Cookies from 'universal-cookie';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { URL_SSO } from '../../config';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  status: false,
  user: {}
};
// const URL_SSO = 'https://naga-sso-api-dev.azurewebsites.net';
// const URL_SSO = 'https://naga-sso-api.azurewebsites.net';
const URL_CLIENT = 'https://nagaclubs.com/signin';
// const JWT_SECRET = 'minimal-secret-key';
// const JWT_EXPIRES_IN = '5 days';

const slice = createSlice({
  name: 'authJwt',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // INITIALISE
    getInitialize(state, action) {
      state.isLoading = false;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },

    // LOGIN
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // REGISTER
    registerSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },

    // LOGOUT
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    // LOGOUT
    sendMailSuccess(state) {
      state.status = true;
      state.user = null;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode(accessToken);

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

const setSession = (accessToken, refreshToken) => {
  const cookies = new Cookies();
  if (accessToken) {
    cookies.set('refreshToken', refreshToken);
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    cookies.set('myCat', null);
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

export function login({ username, password }) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    setSession(null);
    console.log(4);
    try {
      const response = await axios.post(`${URL_SSO}/Accounts/authenticate`, {
        username,
        password
      });

      if (response.status === 200) {
        const accessToken = response.data.jwtToken;
        const { refreshToken } = response.data;
        setSession(accessToken, refreshToken);
        localStorage.setItem('id', response.data.id);

        const decoded = jwtDecode(response.data.jwtToken);
        if (decoded.role === 'User') {
          return {
            role: decoded.role,
            url: URL_CLIENT,
            message: 'Permission denied'
          };
        }
        const user = {
          email: decoded.email,
          username: decoded.username,
          role: decoded.role,
          photoURL:
            'https://gravatar.com/avatar/bc0d45e81052486d0ba68fb960a63690?s=400&d=robohash&r=x'
        };
        dispatch(slice.actions.loginSuccess({ user }));
      } else {
        return { role: null, message: response.data.message };
      }
    } catch (error) {
      return { role: null, message: error.message };
    }
  };
}

// ----------------------------------------------------------------------

export function register({
  firstName,
  lastName,
  username,
  role,
  email,
  password,
  confirmPassword,
  acceptTerms
}) {
  // eslint-disable-next-line consistent-return
  return async () => {
    const title = 'admin';
    console.log('api');
    try {
      const response = await axios.post(`${URL_SSO}/Accounts/register`, {
        title,
        firstName,
        lastName,
        username,
        role,
        email,
        password,
        confirmPassword,
        acceptTerms
      });
      if (response.status === 200) {
        return { message: response.data.message };
      }
    } catch (ex) {
      if (ex.status === 400) {
        return { message: ex.data.message };
      }
      return { message: 'ERROR' };
    }
  };
}

// ----------------------------------------------------------------------

export function logout() {
  return async (dispatch) => {
    const accessToken = window.localStorage.getItem('accessToken');
    if (accessToken && isValidToken(accessToken)) {
      const cookies = new Cookies();
      const token = cookies.get('refreshToken');
      // axios.defaults.withCredentials = true;
      const response = await axios.post(`${URL_SSO}/Accounts/revoke-token`, {
        token
      });
      if (response.status === 200) {
        setSession(null);
        dispatch(slice.actions.logoutSuccess());
      }
    } else {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: true,
          user: null
        })
      );
    }
  };
}

// ----------------------------------------------------------------------
export function getRefresh() {
  return async (dispatch) => {
    const accessToken = window.localStorage.getItem('accessToken');
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    const response = await axios.get(`${URL_SSO}/Accounts/refresh-token`);
    const dataResponse = response.data;
    if (dataResponse.status === 400) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: true,
          user: null
        })
      );
    }
    if (dataResponse.status === 404) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: true,
          user: null
        })
      );
    }
    if (dataResponse.status === 200) {
      setSession(dataResponse.data.accessToken);
    }
  };
}
export function getInitialize() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    console.log(3);
    try {
      const accessToken = window.localStorage.getItem('accessToken');
      if (accessToken && isValidToken(accessToken)) {
        const cookies = new Cookies();
        const token = cookies.get('refreshToken');
        // axios.defaults.withCredentials = true;
        const response = await axios.post(`${URL_SSO}/Accounts/refresh-token`, {
          token
        });
        if (response.status === 200) {
          const accessToken = response.data.jwtToken;
          const { refreshToken } = response.data;
          setSession(accessToken, refreshToken);
          const decoded = jwtDecode(accessToken);
          const user = {
            email: decoded.email,
            username: decoded.username,
            role: decoded.role,
            photoURL:
              'https://gravatar.com/avatar/bc0d45e81052486d0ba68fb960a63690?s=400&d=robohash&r=x'
          };
          dispatch(
            slice.actions.getInitialize({
              isAuthenticated: true,
              user
            })
          );
        } else {
          console.log('Failed api');
        }
      } else {
        console.log('failed');
        dispatch(
          slice.actions.getInitialize({
            isAuthenticated: false,
            user: null
          })
        );
      }
    } catch (error) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}

export function sendMail({ message, subject, toAddress }) {
  // eslint-disable-next-line consistent-return
  return async (dispatch) => {
    // console.log(message, subject, toAddress);
    try {
      const response = await axios.post('/api/mail/send-mail', {
        message,
        subject,
        toAddress
      });
      console.error(response);
      return { message: response.status };
    } catch (error) {
      dispatch(
        slice.actions.getInitialize({
          isAuthenticated: false,
          user: null
        })
      );
    }
  };
}
