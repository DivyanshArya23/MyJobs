import Router from 'next/router';
import store from '../../redux/store';
import { STORAGE_KEYS } from '../../config';
import * as actions from '../../redux/actions';

export const handleLogout = () => {
  sessionStorage.removeItem(STORAGE_KEYS.USER);
  store.dispatch(actions.updateUser({}));
  Router.push('/login');
};

export const checkUserLogin = (isUser = true) => {
  const reduxUser = store.getState().user;
  const sessionUser = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.USER));
  const userToken = reduxUser?.token || sessionUser?.token;
  if (!userToken && isUser) {
    handleLogout();
  } else if (userToken && !isUser) {
    Router.push('/dashboard');
  }
};

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
