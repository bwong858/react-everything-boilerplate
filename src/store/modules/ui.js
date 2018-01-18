export const SET_LOADING_MESSAGE = 'SET_LOADING_MESSAGE';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

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

export const setLoadingMessage = message => ({
  type: SET_LOADING_MESSAGE,
  message
});

export const setErrorMessage = message => ({
  type: SET_ERROR_MESSAGE,
  message
});
