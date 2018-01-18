// import decode from 'jwt-decode';

// import { setErrorMessage } from './ui';
// import auth from '../api/auth';
// import users from '../api/users';

export const USER_LOGGED_IN = 'USER_LOGGED_IN';
export const USER_LOGGED_OUT = 'USER_LOGGED_OUT';

console.log('email: true hardcoded here');
export default (state = { email: true }, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { ...state, ...action.user };
    case USER_LOGGED_OUT:
      return {};
    default:
      return state;
  }
};

// export const handleLoginResponse = res => {
//   const { errors, token } = res;
//   if (errors) return setErrorMessage(errors);
//   if (token) {
//     localStorage.TOKEN_NAME = token;
//     return userLoggedIn(decode(token).user);
//   }
// };

// export const login = credentials => dispatch =>
//   auth.login(credentials).then(res => dispatch(handleLoginResponse(res)));

// export const signup = user => dispatch =>
//   users.signup(user).then(res => dispatch(handleLoginResponse(res)));

export const signup = user => dispatch => dispatch(userLoggedIn(user));

export const logout = () => dispatch => {
  // localStorage.removeItem('TOKEN_NAME');
  dispatch(userLoggedOut());
};

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});
