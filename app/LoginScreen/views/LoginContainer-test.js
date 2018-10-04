/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';
import someAxios from 'axios';
import LoginContainer from './LoginContainer';

jest.mock('axios');


describe('LoginContainer', () => {
  function renderedComponent() {
    return shallow(<LoginContainer />);
  }

  describe('render', () => {
    it('should be render Image Logo', () => {
      expect(renderedComponent().find('Image')).toBeDefined();
    });
    it('should be render Login Form', () => {
      expect(renderedComponent().find('LoginForm')).toBeDefined();
    });
  });


  describe('onChange', () => {
    it('should  be able change the state of customerId when user input customerId', () => {
      const email = 'zoombank@btpn.com';
      const wrapper = shallow(<LoginContainer />);
      wrapper.instance().handleChangeEmail(email);
      expect(wrapper.state().customerId).toBe(email);
    });
    it('should  be able change the state of password when user input password', () => {
      const password = 'z00mBa321';
      const wrapper = shallow(<LoginContainer />);
      wrapper.instance().handleChangePassword(password);
      expect(wrapper.state().password).toBe(password);
    });
  });

  describe('_signInAsync', () => {
    it('should  be change status isLogin if success authenticate', async () => {
      someAxios.get.mockImplementation(() => Promise.resolve({
        status: 200,
      }));
      const wrapper = shallow(<LoginContainer />);
      wrapper.instance()._signInAsync();
      await Promise.resolve();
      expect(wrapper.state().isLogin).toBe(true);
    });
  });

  // describe('handleSubmit', () => {
  //   it('should be able to login application when press button ', async () => {
  //     someAxios.get.mockImplementation(() => Promise.resolve());
  //     const wrapper = shallow(<LoginContainer />);
  //     const callbackFn = jest.fn();
  //     wrapper.setState({ isLogin: true });
  //     wrapper.setProps(
  //       {
  //         navigation: {
  //           navigate: callbackFn,
  //         },
  //       },
  //     );
  //
  //     wrapper.instance().handleSubmit();
  //     await Promise.resolve();
  //     expect(someAxios.get).toHaveBeenCalled();
  //     expect(callbackFn).toHaveBeenCalled();
  //   });
  // });
});
