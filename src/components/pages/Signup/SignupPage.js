import React from 'react';
import { Link } from 'react-router-dom';

import SignupForm from './SignupForm';

const SignupPage = () => (
  <div id="signup-page">
    <h1>Signup</h1>
    <SignupForm />
    <h3>
      or <Link to="/login">Log In</Link>
    </h3>
  </div>
);

export default SignupPage;
