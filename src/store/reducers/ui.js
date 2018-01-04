import { SET_LOADING_MESSAGE, SET_ERROR_MESSAGE } from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_LOADING_MESSAGE:
      return { ...state, loadingMessage: action.message };
    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.message };
    default:
      return state;
  }
};
