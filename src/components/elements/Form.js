import React, { Component } from 'react';

import InlineMessage from './InlineMessage';

export const Validation = function(type, message) {
  this.type = type;
  this.message = message;
};

export const validationTypes = {
  ERROR: 'error',
  WARNING: 'warning'
};

export const requiredValidation = new Validation(validationTypes.ERROR, 'Must be provided');

export const inputTypes = {
  INPUT: 'input',
  TEXTAREA: 'textarea',
  SELECT: 'select'
};

const isPasswordInput = inputName => inputName.toLowerCase().includes('password');

class Form extends Component {
  // must provide
  inputProps = {
    something: {
      label: 'Something',
      placeholder: 'Something amazing',
      validator: () => {
        const something = this.state.inputs.something.trim();
        if (!something) return requiredValidation;
        if (!something.toLowerCase().includes('cowbell'))
          return new Validation(validationTypes.ERROR, 'Needs more cowbell');
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

  componentWillMount = () => {
    const inputs = Object.keys(this.inputProps).reduce((inputsMap, input) => {
      inputsMap[input] = '';
      return inputsMap;
    }, {});
    this.setState({ inputs, inputValidations: {}, previousInputs: {} });
  };

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
        if (validation && validation.type === validationTypes.ERROR) areErrors = true;
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
    const input = e.target.name;
    e.persist();
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

  getValidationClassName = input => {
    const validation = this.state.inputValidations[input];
    return validation ? validation.type : '';
  };

  parseInput = input => {
    const { INPUT, TEXTAREA, SELECT } = inputTypes;
    const { placeholder, inputType } = this.inputProps[input];
    const sharedProps = {
      className: this.getValidationClassName(input),
      name: input,
      value: this.state.inputs[input],
      placeholder: placeholder || '',
      onChange: this.onChange,
      onBlur: this.validateOne
    };

    switch (inputType) {
      case TEXTAREA:
        return <textarea {...sharedProps} />;
      default:
        return (
          <input type={isPasswordInput(sharedProps.name) ? 'password' : 'text'} {...sharedProps} />
        );
    }
  };

  render = () => (
    <form onSubmit={this.onSubmit}>
      <div className="fields">
        {Object.keys(this.state.inputs).map(input => {
          const validation = this.state.inputValidations[input];
          return (
            <div key={`field-${input}`} className={`field ${input}`}>
              <label htmlFor={input}>{this.inputProps[input].label || ''}</label>
              {validation && (
                <InlineMessage
                  className="validation"
                  type={validation.type}
                  text={validation.message}
                />
              )}
              {/*<div className="label-and-validation">
                <label htmlFor={input}>{this.inputProps[input].label || ''}</label>
                {validation && <InlineMessage type={validation.type} text={validation.message} />}
          </div>*/}
              <div className={`input ${this.getValidationClassName(input)}`}>
                {this.parseInput(input)}
              </div>
            </div>
          );
        })}
      </div>
      <button type="submit">{(this.options && this.options.buttonLabel) || 'Submit'}</button>
    </form>
  );
}

export default Form;
