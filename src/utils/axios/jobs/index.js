import axios from 'axios';
import { API_URLS } from '../../../config';
import * as actions from '../../../redux/actions';
import store from '../../../redux/store';

const axiosInstance = axios.create({
  baseURL: API_URLS.jobs.url,
});

axiosInstance.interceptors.request.use((config) => {
  store.dispatch(actions.showLoader());
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    store.dispatch(actions.hideLoader());
    return response.data;
  },
  (error) => {
    store.dispatch(actions.hideLoader());
    return Promise.reject(error?.response);
  }
);

export default axiosInstance;
