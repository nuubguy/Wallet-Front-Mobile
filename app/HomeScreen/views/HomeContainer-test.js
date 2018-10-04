/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import someAxios from 'axios';
import HomeContainer from './HomeContainer';
import LoginContainer from '../../LoginScreen/views/LoginContainer';
import AccountService from './AccountService';
import TransferContainer from '../../TransferScreen/views/TransferContainer';

jest.mock('./AccountService');

describe('HomeContainer', () => {
  describe('render', () => {
    it('should have AppHeader ', () => {
      const wrapper = shallow(<HomeContainer />);
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

    it('should have props data in Transaction Header', () => {
      const wrapper = shallow(<HomeContainer />);
      expect(wrapper.find('TransactionHeader').props().data).toEqual([]);
    });

    it('should be able to get latest transaction ', async () => {
      const mockGetLatestTransaction = jest.fn(() => Promise.resolve({
        data: '',
      }));
      AccountService.mockImplementation(() => ({
        getLatestTransaction: mockGetLatestTransaction,
      }));
      const wrapper = shallow(<HomeContainer />);
      wrapper.instance().componentDidMount();
      await Promise.resolve();
      expect(mockGetLatestTransaction).toHaveBeenCalled();
    });

  });
});
