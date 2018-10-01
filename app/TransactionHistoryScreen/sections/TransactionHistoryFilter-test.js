/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import TransactionHistoryFilter from './TransactionHistoryFilter';

describe('TransactionHistoryFilter', () => {
  const transactions = [{
    amount: 1220302,
    dateTime: '2018-09-28T14:07:17.369',
    transactionId: 'T00000006',
    transactionType: 'credit',
  }, {
    amount: 2220302,
    dateTime: '2018-09-28T14:07:17.369',
    transactionId: 'T00000007',
    transactionType: 'credit',
  }];
  it('should show AppHeader in Transaction Container ', () => {
    const wrapper = shallow(<TransactionHistoryFilter />);

    expect(wrapper.find('AppHeader').length).toBe(1);
  });

    it('should show InputFilter in Transaction Container ', () => {
        const wrapper = shallow(<TransactionHistoryFilter />);

        expect(wrapper.find('InputFilter').length).toBe(1);
    });

    it('should showDialog when filter button has been clicked', function () {
        const wrapper = shallow(<TransactionHistoryFilter />);
        wrapper.instance().showDialog()
        expect(wrapper.state().dialogVisible).toBe(true);
    });

    it('should update transactions when submit button clicked', function () {
        const wrapper = shallow(<TransactionHistoryFilter />);
        wrapper.instance().handleSubmit()
        expect(wrapper.state().transactions).toBe(undefined);
    });

    it('should change state description when the description has been change', function () {
        const wrapper = shallow(<TransactionHistoryFilter />);
        wrapper.instance().descriptionOnChange('transfer')
        expect(wrapper.state().description).toBe('transfer');
    });
});
