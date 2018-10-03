import React from 'react';
import { shallow } from 'enzyme';
import TransactionList from './TransactionList';

describe('Transaction', () => {
  function renderTransactionList() {
    return shallow(<TransactionList currentTransactions={[{
      transactionId: 'T00000007',
      type: 'debit',
      dateTime: '2018-09-15T16:22:04.601',
      amount: 500000,
      currency: 'IDR',
    }]}
    />);
  }

  describe('render', () => {
    it('should has a table of last five transactions', () => {
      const transactionList = renderTransactionList();

        expect(transactionList.find('ScrollViewMock').length).toBe(1);
    });

  });
});
