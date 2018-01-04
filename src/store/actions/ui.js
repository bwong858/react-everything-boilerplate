import { SET_LOADING_MESSAGE, SET_ERROR_MESSAGE } from './actionTypes';

export const setLoadingMessage = message => ({
  type: SET_LOADING_MESSAGE,
  message
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  message
});
