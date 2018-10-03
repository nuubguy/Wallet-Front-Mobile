/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import TransactionHeader from './TransactionHeader';

describe('TransactionHeader', () => {
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
  it('should show LabelTransaction', () => {
    const wrapper = shallow(<TransactionHeader data={transactions} />);
    expect(wrapper.find('#LabelTransaction').length).toBe(1);
  });

  it('should show icon in AppHeader ', () => {
    const wrapper = shallow(<TransactionHeader data={transactions} />);
    expect(wrapper.find('#naviagateIcon').length).toBe(1);
  });

  it('should show TransactionList ', () => {
    const wrapper = shallow(<TransactionHeader data={transactions} />);
    expect(wrapper.find('TransactionList').length).toBe(1);
  });

  it('should redirect to the different page ', () => {
    const wrapper = shallow(<TransactionHeader data={transactions} />);
    const callbackFn = jest.fn();
    wrapper.setProps({ navigate: callbackFn });
    wrapper.find('#naviagateIcon').simulate('press');
    expect(callbackFn).toHaveBeenCalledTimes(0);
  });
});
