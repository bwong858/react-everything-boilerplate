// import decode from 'jwt-decode';

import { USER_LOGGED_IN, USER_LOGGED_OUT } from './actionTypes';
// import { setErrorMessage } from './ui';
// import auth from '../api/auth';

// export const handleTokenUpdate = res => {
//   const { errors, token } = res;
//   if (errors) return setErrorMessage(errors);
//   if (token) {
//     localStorage.TOKEN_NAME = token;
//     return userLoggedIn(decode(token).user);
//   }
// };

// export const login = credentials => dispatch =>
//   auth.login(credentials).then(res => dispatch(handleTokenUpdate(res)));

// export const logout = () => dispatch => {
//   localStorage.removeItem('TOKEN_NAME');
//   dispatch(userLoggedOut());
// };

export const logout = () => dispatch => {
  dispatch(userLoggedOut());
};

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});
