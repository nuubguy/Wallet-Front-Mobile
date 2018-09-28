/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import AppHeader from './AppHeader';

describe('HomeContainer', () => {
  describe('render', () => {
    it('should have Icon ', () => {
      const wrapper = shallow(<AppHeader />);
      console.log(wrapper.find('#imageHeader').length);
      expect(wrapper.find('#imageHeader').length).toBe(1);
    });

    it('should have Icon ', () => {
      const wrapper = shallow(<AppHeader title="Home" />);
      console.log(wrapper.find('#titleHeader').length);
      console.log(wrapper.find('#titleHeader').innerText);
      expect(wrapper.find('#titleHeader').length).toBe(1);

    });
  });
});
