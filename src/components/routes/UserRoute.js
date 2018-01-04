import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const UserRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

export default connect(({ user: { email } }) => ({ isAuthenticated: !!email }), null)(UserRoute);
