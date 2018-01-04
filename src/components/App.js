import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import GuestRoute from './routes/GuestRoute';
import UserRoute from './routes/UserRoute';
import AppHeader from './elements/AppHeader';
import AppFooter from './elements/AppFooter';
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import TestPage from './pages/TestPage';

const App = ({ location }) => (
  <div id="app-wrapper">
    <AppHeader />
    <div id="app-body">
      <Switch>
        <GuestRoute location={location} exact path="/signup" component={SignupPage} />
        <GuestRoute location={location} exact path="/login" component={LoginPage} />
        <UserRoute location={location} exact path="/test" component={TestPage} />
        <Redirect to="/test" />
      </Switch>
    </div>
    <AppFooter />
  </div>
);

export default App;
