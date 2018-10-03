/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';
import PayeeContainer from './PayeeContainer';
import AccountService from '../../HomeScreen/views/AccountService';

jest.mock('../../HomeScreen/views/AccountService');


describe('PayeeContainer', () => {
  function renderedComponent() {
    return shallow(<PayeeContainer />);
  }

  describe('render', () => {
    it('should be render Payee Form', () => {
      expect(renderedComponent().find('PayeeForm')).toBeDefined();
    });

    it('should be get data account ', async () => {
      const mockGetAccount = jest.fn(() => Promise.resolve({
        data: '',
      }));
      AccountService.mockImplementation(() => ({
        getAccount: mockGetAccount,
      }));
      const wrapper = shallow(<PayeeContainer />);
      wrapper.instance().getInfoAccount();
      await Promise.resolve();
      expect(mockGetAccount).toHaveBeenCalled();
    });
  });

  describe('onChange', () => {
    it('should change the state of payeeAccount when there is change input payeeAccount', () => {
      const payeeAccount = 'A00000002';
      const wrapper = shallow(<PayeeContainer />);
      wrapper.instance().handleChangeAccount(payeeAccount);
      expect(wrapper.state().payeeAccount).toBe(payeeAccount);
      expect(wrapper.state().payeeAccountName).toBe('');
    });
  });

  describe('handleClickCheck', () => {
    it('should be able to check account when press button check', async () => {
      const mockGetAccountById = jest.fn(() => Promise.resolve({
        data: '',
      }));
      AccountService.mockImplementation(() => ({
        getAccountById: mockGetAccountById,
      }));
      const wrapper = shallow(<PayeeContainer />);
      wrapper.instance().handleClickCheck();
      await Promise.resolve();
      expect(mockGetAccountById).toHaveBeenCalled();
    });

    it('should be able to post payee when press button submit', async () => {
      const mockPutPayee = jest.fn(() => Promise.resolve({
        data: '',
      }));
      AccountService.mockImplementation(() => ({
        putPayee: mockPutPayee,
      }));
      const wrapper = shallow(<PayeeContainer />);
      wrapper.instance().handleSubmit();
      await Promise.resolve();
      expect(mockPutPayee).toHaveBeenCalled();
    });
  });
});
