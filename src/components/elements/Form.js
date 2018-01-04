import React, { Component } from 'react';

import InlineMessage from './InlineMessage';
import { ERROR } from '../constants';

export const Validation = function(type, message) {
  this.type = type;
  this.message = message;
};

const isPasswordInput = inputName => inputName.toLowerCase().indexOf('password') !== -1;

class Form extends Component {
  // must provide
  state = {
    inputs: {
      something: ''
    }
  };

  // must provide
  inputProps = {
    something: {
      label: 'Something',
      placeholder: 'Something amazing',
      validator: () => {
        const something = this.state.inputs.something.trim();

        if (!something) return new Validation(ERROR, 'Something must be provided');
        return null;
      }
    }
  };

  // optionally provide
  options = {
    buttonLabel: 'Submit',
    verifyInputChange: true
  };

  // must provide for custom callback
  onValidationSuccess = () => {
    console.log('no errors :D');
  };

  componentWillMount() {
    this.setState({ inputValidations: {}, previousInputs: {} });
  }

  validateOne = e => {
    const input = e.target.name;
    const { validator } = this.inputProps[input];

    if (validator) {
      const validation = validator();
      this.setState({ inputValidations: { ...this.state.inputValidations, [input]: validation } });
    }
  };

  validateAll = () => {
    const inputValidations = {};
    let areErrors = false;

    for (const input in this.inputProps) {
      const validator = this.inputProps[input].validator;
      if (validator) {
        const validation = validator();
        inputValidations[input] = validation;
        if (validation && validation.type === ERROR) areErrors = true;
      }
    }

    return new Promise((resolve, reject) =>
      this.setState({ inputValidations }, () => {
        if (areErrors) reject(new Error('input errors D:'));
        resolve();
      })
    );
  };

  verifyInputChange = () => {
    const { inputs, previousInputs } = this.state;
    const newInputs = {};
    let hasChanged = false;

    for (const input in inputs) {
      newInputs[input] = isPasswordInput(input) ? inputs[input] : inputs[input].trim();
      if (newInputs[input] !== previousInputs[input]) hasChanged = true;
    }

    return new Promise(
      (resolve, reject) =>
        hasChanged
          ? this.setState({ previousInputs: newInputs }, resolve)
          : reject(new Error("Input hasn't changed"))
    );
  };

  validateSubmission = () =>
    this.validateAll().then(this.options.verifyInputChange ? this.verifyInputChange : true);

  onChange = e => {
    e.persist();
    const input = e.target.name;

    this.setState(
      {
        inputs: {
          ...this.state.inputs,
          [input]: e.target.value
        }
      },
      () => {
        if (this.state.inputValidations[input]) this.validateOne(e);
      }
    );
  };

  onSubmit = e => {
    e.preventDefault();
    this.validateSubmission()
      .then(this.onValidationSuccess)
      .catch(console.log);
  };

  renderInputFields = () => (
    <div className="input-fields">
      {Object.keys(this.state.inputs).map(input => {
        const { label, placeholder } = this.inputProps[input];
        const validation = this.state.inputValidations[input];
        const inputType = isPasswordInput(input) ? 'password' : 'text';

        return (
          <div key={`input-${input}`} className={`input-${input}`}>
            <label htmlFor={input}>{label}</label>
            <input
              className={validation && validation.type}
              type={inputType}
              name={input}
              value={this.state.inputs[input]}
              placeholder={placeholder}
              onChange={this.onChange}
              onBlur={this.validateOne}
            />
            {validation && <InlineMessage type={validation.type} text={validation.message} />}
          </div>
        );
      })}
    </div>
  );

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.renderInputFields()}
        <button type="submit">{this.options.buttonLabel}</button>
      </form>
    );
  }
}

export default Form;
