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
  });
});
