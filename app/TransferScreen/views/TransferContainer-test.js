/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';

import TransferContainer from './TransferContainer';
import AccountService from '../../HomeScreen/views/AccountService';


jest.mock('../../HomeScreen/views/AccountService');


describe('TransferContainer', () => {
  function renderedComponent() {
    return shallow(<TransferContainer />);
  }

  describe('render', () => {
    it('should be render Transfer Form', () => {
      expect(renderedComponent().find('TransferForm')).toBeDefined();
    });
  });

  describe('onChange', () => {
    it('should change the state of account when there is change input account', () => {
      const account = 'A00000001';
      const wrapper = shallow(<TransferContainer />);
      wrapper.instance().handleChangeAccount(account);

      expect(wrapper.state().recipientAccountId).toBe(account);
    });

    it('should change the state of amount when there is change input amount', () => {
      const amount = '10000';
      const wrapper = shallow(<TransferContainer />);
      wrapper.instance().handleChangeAmount(amount);
      expect(wrapper.state().amount).toBe(amount);
    });

    it('should change the state of description when there is change input description', () => {
      const description = 'Buy Pizza';
      const wrapper = shallow(<TransferContainer />);
      wrapper.instance().handleChangeDescription(description);
      expect(wrapper.state().description).toBe(description);
    });
  });


  describe('handleClickCheck', () => {
    it('should be able to check account id', async () => {
      const payees = [
        { accountId: 'A0001', customer: { name: 'fauzan' } },
        { accountId: 'A0002', customer: { name: 'rifki' } },
      ];
      const wrapper = shallow(<TransferContainer />);
      wrapper.setState({
        payees,
        recipientAccountId: 'A0001',
      });

      wrapper.instance().handleClickCheck();
      expect(wrapper.state().isFound).toBe(true);
    });

    it('should be show message when cannot found account id', async () => {
      const payees = [{ acccountId: 'A0001' }, { acccountId: 'A0002' }];
      const wrapper = shallow(<TransferContainer />);
      wrapper.setState({
        payees,
        recipientAccountId: 'A00013',
      });
      wrapper.instance().handleClickCheck();
      expect(wrapper.state().isFound).toBe(false);
    });
  });

  describe('handleSubmit', () => {
    it('should be able to post to wallet when press button transfer', async () => {
      const mockPostTransfer = jest.fn(() => Promise.resolve({
        data: '',
      }));
      AccountService.mockImplementation(() => ({
        postTransfer: mockPostTransfer,
      }));
      const wrapper = shallow(<TransferContainer />);
      wrapper.instance().handleSubmit();
      await Promise.resolve();
      expect(mockPostTransfer).toHaveBeenCalled();
    });
  });
});
