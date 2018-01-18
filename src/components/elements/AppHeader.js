import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../store/modules/auth';

const AppHeader = ({ isAuthenticated, logout }) => (
  <header id="app-header">
    <h1>HEADER</h1>
    {isAuthenticated && (
      <button className="logout-button" onClick={logout}>
        Log Out
      </button>
    )}
  </header>
);

export default connect(({ auth: { email } }) => ({ isAuthenticated: !!email }), { logout })(
  AppHeader
);
