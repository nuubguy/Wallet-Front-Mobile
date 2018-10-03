/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  function loginFormComponent() {
    return shallow(<LoginForm />);
  }

  describe('render', () => {
    it('should have input customerId #customerId', () => {
      expect(loginFormComponent().find('#email')).toHaveLength(1);
    });

    it('should have input password #password', () => {
      expect(loginFormComponent().find('#password')).toHaveLength(1);
    });

    it('should have input button confirm #btnLogin', () => {
      expect(loginFormComponent().find('#btnLogin')).toHaveLength(1);
    });
  });

  describe('onChange', () => {
    it('should be call onChangeEmail() when user input customerId', () => {
      const onChangeEmail = jest.fn();
      const rendered = loginFormComponent().setProps({ onChangeEmail });
      rendered.find('#email').simulate('changeText');
      expect(onChangeEmail).toHaveBeenCalled();
    });

    it('should be call onChangePassword() when user input password', () => {
      const onChangePassword = jest.fn();
      const rendered = loginFormComponent().setProps({ onChangePassword });
      rendered.find('#password').simulate('changeText');
      expect(onChangePassword).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should be call onPressSubmit() when submit form', () => {
      const onPressSubmit = jest.fn();
      const rendered = loginFormComponent().setProps({ onPressSubmit });
      rendered.find('#btnLogin').simulate('press');
      expect(onPressSubmit).toHaveBeenCalled();
    });
  });
});
