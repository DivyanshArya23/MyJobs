import * as types from '../types';

export const showLoader = () => ({
  type: types.SHOW_LOADER,
});
export const hideLoader = () => ({
  type: types.HIDE_LOADER,
});

export const updateUser = (payload) => ({
  type: types.UPDATE_USER,
  payload,
});
