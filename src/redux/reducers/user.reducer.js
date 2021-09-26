import * as types from '../types';

const initialState = {};

const UserReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_USER:
      return { ...payload };

    default:
      return state;
  }
};

export default UserReducer;
