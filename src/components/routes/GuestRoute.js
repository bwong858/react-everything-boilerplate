import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const GuestRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
  />
);

export default connect(({ auth: { email } }) => ({ isAuthenticated: !!email }), null)(GuestRoute);
