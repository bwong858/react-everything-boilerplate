import { userLoggedIn } from './auth';
// import users from '../api/users';
// import { handleTokenUpdate } from './auth';

// export const signup = user => dispatch =>
//   users.signup(user).then(res => dispatch(handleTokenUpdate(res)));

export const signup = user => dispatch => dispatch(userLoggedIn(user));
