/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import HomeContainer from './HomeContainer';

describe('HomeContainer', () => {
  describe('render', () => {
    it('should have AppHeader ', () => {
      const wrapper = shallow(<HomeContainer />);
      console.log(wrapper.find('AppHeader').props());
      expect(wrapper.find('AppHeader').length).toBe(1);
    });

    it('should have props title contains Home', () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper.find('AppHeader').props().title).toBe('Home');
    });

    it('should have props title contains Home', () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper.find('AppHeader').props().data).toEqual({});
    });

    it('should have props data in Username element', () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper.find('Username').props().data).toEqual('');
    });

    it('should have props data in Balance element', () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper.find('Balance').props().data).toEqual({ amount: '', currency: '' });
    });

      it('should have props data in Transaction Header', () => {
          const wrapper = shallow(<HomeContainer />);
          expect(wrapper.find('TransactionHeader').props().data).toEqual([]);
      });


      //navigate
  });
});
