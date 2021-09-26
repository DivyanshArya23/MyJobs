import store from '../../redux/store';
import { STORAGE_KEYS } from '../../config';
import * as actions from '../../redux/actions';
// import { API } from '../../config/apiurl';
// import axios from '../axios/auth';
// import logger from '../logger';

// export const isTokenValid = async (token) => {
//   try {
//     const res = await axios.get(`/${API.RESET_PASSWORD}/${token}`);
//     console.log("isTokenValid::", res);
//   } catch (error) {
//     logger.log("error:", error);
//   }
// };

// export const checkUserLogin = () => {
//   const reduxUser = store.getState().user;
//   const sessionUser = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.USER));
//   const userToken = reduxUser?.token || sessionUser?.token;
//   const isValidToken = isTokenValid(userToken);
//   console.log("checkUserLogin::", isValidToken);
// };

export const setUserFromSession = async () => {
  const sessionUser = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.USER));
  if (sessionUser) store.dispatch(actions.updateUser(sessionUser));
};

export const getToken = () => {
  const reduxUser = store.getState().user;
  const sessionUser = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.USER));
  const userToken = reduxUser?.token || sessionUser?.token;
  return userToken;
};
