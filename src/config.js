export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APPID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

export const cloudinaryConfig = {
  cloudinaryKey: process.env.REACT_APP_CLOUDINARY_KEY,
  cloudinaryPreset: process.env.REACT_APP_CLOUDINARY_PRESET,
  cloudinaryUrl: process.env.REACT_APP_CLOUDINARY_URL
};

export const mapConfig = process.env.REACT_APP_MAP_MAPBOX;
export const googleAnalyticsConfig = process.env.REACT_APP_GA_MEASUREMENT_ID;

//
// export const URL_SSO =
//   process.env.NODE_ENV === 'Production'
//     ? 'https://naga-sso-api.azurewebsites.net'
//     : 'https://naga-sso-api-dev.azurewebsites.net';

// export const URL_CHAT =
//   process.env.NODE_ENV === 'Production'
//     ? 'https://libra-chat-api.azurewebsites.net/'
//     : 'https://libra-chat-api-dev.azurewebsites.net/';

// export const baseURL =
//   process.env.NODE_ENV === 'Production'
//     ? 'https://naga-admin-api.azurewebsites.net/'
//     : 'https://naga-admin-api-dev.azurewebsites.net/';

// export const GAME_URL =
//   process.env.NODE_ENV === 'Production'
//     ? 'https://naga-game-api.azurewebsites.net'
//     : 'https://naga-game-api-dev.azurewebsites.net';

export const URL_SSO = process.env.REACT_APP_URL_SSO;

export const URL_CHAT = process.env.REACT_APP_URL_CHAT;

export const baseURL = process.env.REACT_APP_baseURL;

export const GAME_URL = process.env.REACT_APP_GAME_URL;
