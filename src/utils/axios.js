import axios from 'axios';
// eslint-disable-next-line import/named
import { baseURL } from '../config';
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  // baseURL: 'https://naga-admin-api-dev.azurewebsites.net/'
  baseURL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export default axiosInstance;
