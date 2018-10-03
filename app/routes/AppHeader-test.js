/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './AppHeader';

describe('AppHeader', () => {
  describe('render', () => {
    it('should have header component ', () => {
      const wrapper = shallow(<AppHeader title="Home" />);
      expect(wrapper.find('Header').length).toBeDefined();
    });

    it('simulate press on header and call a callback', () => {
      const wrapper = shallow(<AppHeader title="Home" />);
      const callbackFn = jest.fn();
      console.log(wrapper.debug());
    });

    it('should call handleSubmit when the submit button clicked2', () => {
      const callbackFn = jest.fn();
      const renderedComponent = shallow(<AppHeader title="Home" />).setProps({ handleSubmit: callbackFn });

      renderedComponent.find('Header').props().leftComponent.simulate('press');

      // renderedComponent.find('#submit').simulate('press');
      expect(callbackFn).toHaveBeenCalledTimes(1);
    });
  });
});
