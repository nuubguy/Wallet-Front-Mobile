/* global expect it describe */

import React from 'react';
import {shallow} from 'enzyme';
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
    it('should show two transaction in list and first one with key T00000006 ', () => {
        const wrapper = shallow(<TransactionHeader data={transactions}/>);
        expect(wrapper.find('#transactionsId').props().children.length).toBe(2);
        expect(wrapper.find('#transactionsId').props().children[0].key).toBe('T00000006');
    });
});
