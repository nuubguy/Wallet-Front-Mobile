/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';
import LoginLoading from './LoginLoading';

describe('LoginLoading', () => {
  function renderedComponent() {
    return shallow(<LoginLoading />);
  }

  describe('render', () => {
    it('should be render ActivityIndicator', () => {
      expect(renderedComponent().find('ActivityIndicator')).toBeDefined();
    });
    it('should be render StatusBar', () => {
      expect(renderedComponent().find('StatusBar')).toBeDefined();
    });
  });

  // describe('_bootstrapAsync', () => {
  //   it('should be checking the authenticate', async () => {
  //     const navigateFn = jest.fn();
  //     const navigation = { navigate: navigateFn };
  //     const wrapper = shallow(<LoginLoading />);
  //     wrapper.setProps({
  //       navigation,
  //     });
  //     wrapper.instance()._bootstrapAsync();
  //     await Promise.resolve()
  //     console.log(wrapper.props().navigation);
  //     expect(wrapper.props().navigation.navigate).toHaveBeenCalled();
  //   });
  // });
});
