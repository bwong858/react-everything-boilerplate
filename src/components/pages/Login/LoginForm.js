import { connect } from 'react-redux';

import Form, { Validation, validationTypes } from '../../elements/Form';
import { userLoggedIn } from '../../../store/modules/auth';
// import { login } from '../../../store/modules/auth';

const { ERROR } = validationTypes;

class LoginForm extends Form {
  inputProps = {
    email: {
      label: 'Email',
      placeholder: 'j.doherty@email.com',
      validator: () => {
        const email = this.state.inputs.email.trim();

        if (!email) return new Validation(ERROR, 'Gotta provide your email to log in!');
        return null;
      }
    },
    password: {
      label: 'Password',
      placeholder: 'Not 1234',
      validator: () => {
        const password = this.state.inputs.password;

        if (!password) return new Validation(ERROR, 'You best have used a password...');
        return null;
      }
    }
  };

  options = {
    buttonLabel: 'Log In'
  };

  onValidationSuccess = () => {
    const { email, password } = this.state.inputs;

    this.props.userLoggedIn({ email: email.trim(), password });
  };
}

export default connect(null, { userLoggedIn })(LoginForm);
// export default connect(null, { login })(LoginForm);
