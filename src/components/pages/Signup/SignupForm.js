import { connect } from 'react-redux';

import Form, { Validation } from '../../elements/Form';
import { signup } from '../../../store/actions/user';
import { ERROR, WARNING } from '../../constants';

class SignupForm extends Form {
  state = {
    inputs: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  inputProps = {
    first_name: {
      label: 'First Name',
      placeholder: 'Janie',
      validator: () => {
        const first_name = this.state.inputs.first_name.trim();

        if (!first_name) return new Validation(ERROR, 'First name must be provided');
        return null;
      }
    },
    last_name: {
      label: 'Last Name',
      placeholder: 'Doherty',
      validator: () => {
        const last_name = this.state.inputs.last_name.trim();

        if (!last_name) return new Validation(WARNING, 'Last name is preferred');
        return null;
      }
    },
    email: {
      label: 'Email',
      placeholder: 'j.doherty@email.com',
      validator: () => {
        const email = this.state.inputs.email.trim();

        if (!email) return new Validation(ERROR, 'Email must be provided');
        return null;
      }
    },
    password: {
      label: 'Password',
      placeholder: 'Not 1234',
      validator: () => {
        const password = this.state.inputs.password;
        // const passwordConfirmation = this.state.inputs.passwordConfirmation;

        if (!password) return new Validation(ERROR, 'Password must be provided');
        // if (password !== passwordConfirmation)
        //   return new Validation(ERROR, 'Password and password confirmation do not match');
        return null;
      }
    },
    passwordConfirmation: {
      label: 'Confirm Password',
      placeholder: 'Still not 1234',
      validator: () => {
        const password = this.state.inputs.password;
        const passwordConfirmation = this.state.inputs.passwordConfirmation;

        if (!passwordConfirmation) return new Validation(ERROR, 'Please confirm your password');
        if (passwordConfirmation !== password) {
          // save for another time...
          // this.validateOne({ target: { name: 'password' } });
          return new Validation(ERROR, 'Password confirmation does not match password');
        }
        return null;
      }
    }
  };

  options = {
    buttonLabel: 'Sign Up'
  };

  onValidationSuccess = () => {
    const { first_name, last_name, email, password } = this.state.inputs;

    this.props.signup({
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      email: email.trim(),
      password: password
    });
  };
}

export default connect(null, { signup })(SignupForm);
