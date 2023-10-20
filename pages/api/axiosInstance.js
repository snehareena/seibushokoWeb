import { UserManagement } from '@/utils/UserManagement';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_REACT_APP_BASEURL;

const instance = axios.create({
    baseURL: baseUrl// Replace with your API base URL
});
instance.interceptors.request.use(
    (config) => {
      const token = UserManagement.getItem('token'); // Get the token from wherever you have stored it
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
      let token = UserManagement.getItem("token");
        if ((token !== null) && error.response.status === 401) {
          UserManagement.removeItem('token');
        }
    return Promise.reject(error);
  }
);
export default instance;
