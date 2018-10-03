/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import TransactionHistoryFilter from './TransactionHistoryFilter';
import AccountService from '../../HomeScreen/views/AccountService';

jest.mock('../../HomeScreen/views/AccountService');

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

  it('should showDialog when filter button has been clicked', () => {
    const wrapper = shallow(<TransactionHistoryFilter />);
    wrapper.instance().showDialog();
    expect(wrapper.state().dialogVisible).toBe(true);
  });

  it('should update transactions when submit button clicked', () => {
    const wrapper = shallow(<TransactionHistoryFilter />);
    wrapper.instance().handleSubmit();
    expect(wrapper.state().transactions).toBe(undefined);
  });

  it('should change state description when the description has been change', () => {
    const wrapper = shallow(<TransactionHistoryFilter />);
    wrapper.instance().descriptionOnChange('transfer');
    expect(wrapper.state().description).toBe('transfer');
  });

  it('should able fetchAllTransaction', () => {
    const respTransactions = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];


    const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactions,
    }));


    mockGetAllTransactionList.mockClear();
    AccountService.mockClear();
    AccountService.mockImplementation(() => ({
      getAllTransactionList: mockGetAllTransactionList,
    }));
    const renderedComponent = shallow(<TransactionHistoryFilter />);

    renderedComponent.instance().handleSubmit();
    expect(mockGetAllTransactionList).toHaveBeenCalled();
  });

  it('should able fetchAllTransaction with ascending order', () => {
    const respTransactions = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];


    const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactions,
    }));


    mockGetAllTransactionList.mockClear();
    AccountService.mockClear();
    AccountService.mockImplementation(() => ({
      getAllTransactionList: mockGetAllTransactionList,
    }));
    const renderedComponent = shallow(<TransactionHistoryFilter />);

    renderedComponent.instance().checkBoxOnChange();

    renderedComponent.instance().handleSubmit();
    expect(mockGetAllTransactionList).toHaveBeenCalledWith(0);
  });

  it('should able fetchTransaction by description with ascending order', () => {
    const respTransactionsBasedOnDescriptions = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];

    const respTransactions = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];

    const mockGetTransactionListBasedOnDescription = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactionsBasedOnDescriptions,
    }));
    const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactions,
    }));


    AccountService.mockClear();
    AccountService.mockImplementation(() => ({
      getAllTransactionList: mockGetAllTransactionList,
      getTransactionListBasedOnDescription: mockGetTransactionListBasedOnDescription,
    }));
    const renderedComponent = shallow(<TransactionHistoryFilter />);

    renderedComponent.instance().descriptionOnChange('a');
    renderedComponent.instance().handleSubmit();

    expect(mockGetAllTransactionList).toHaveBeenCalled();
    expect(mockGetTransactionListBasedOnDescription).toHaveBeenCalledWith('a', 0);
  });

  it('should call getTransactionListBasedOnAmount with default sort param', async () => {
    const respTransactionsFilter = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];

    const mockGetTransactionListBasedOnAmount = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactionsFilter,
    }));

    const respTransactions = [
      {
        transactionId: 'T00000007',
        type: 'debit',
        dateTime: '2018-09-15T16:22:04.601',
        amount: 500000,
        currency: 'IDR',
      },
    ];

    const mockGetAllTransactionList = jest.fn(() => Promise.resolve({
      status: 200,
      data: respTransactions,
    }));

    mockGetAllTransactionList.mockClear();
    AccountService.mockClear();
    AccountService.mockImplementation(() => ({
      getAllTransactionList: mockGetAllTransactionList,
      getTransactionListBasedOnAmount: mockGetTransactionListBasedOnAmount,
    }));


    const renderedContainer = shallow(<TransactionHistoryFilter />);

    renderedContainer.instance().inputOnChange(10000);

      renderedContainer.instance().handleSubmit();

    expect(mockGetAllTransactionList).toHaveBeenCalledWith(0);
    expect(mockGetTransactionListBasedOnAmount).toHaveBeenCalled();
  });

  //still error in here
    it('should call getTransactionListBasedOnAmountAndDescription with default sort param', async () => {
        const respTransactionsFilter=[
            {
                "transactionId": "T00000007",
                "type": "debit",
                "dateTime": "2018-09-15T16:22:04.601",
                "amount": 500000,
                "currency": "IDR"
            }
        ]

        let mockGetTransactionListBasedOnAmountAndDescription= jest.fn(() => Promise.resolve({
            status: 200,
            data: respTransactionsFilter
        }));

        const respTransactions=[
            {
                "transactionId": "T00000007",
                "type": "debit",
                "dateTime": "2018-09-15T16:22:04.601",
                "amount": 500000,
                "currency": "IDR"
            }
        ]

        let mockGetAllTransactionList= jest.fn(() => Promise.resolve({
            status: 200,
            data: respTransactions
        }));

        mockGetAllTransactionList.mockClear();
        AccountService.mockClear();
        AccountService.mockImplementation(() => {
            return {
                getAllTransactionList: mockGetAllTransactionList,
                getTransactionListBasedOnAmountAndDescription: mockGetTransactionListBasedOnAmountAndDescription
            };
        })


        const renderedContainer = shallow(<TransactionHistoryFilter />);
        renderedContainer.setState({ transactions: [] });

        renderedContainer.instance().descriptionOnChange('a');
        renderedContainer.instance().inputOnChange(10000);


        expect(mockGetAllTransactionList).toHaveBeenCalledWith(0);
        expect(mockGetTransactionListBasedOnAmountAndDescription).toHaveBeenCalledTimes(0);
    });

    it('should able to click sort images', () => {
        const respTransactions=[
            {
                "transactionId": "T00000007",
                "type": "debit",
                "dateTime": "2018-09-15T16:22:04.601",
                "amount": 500000,
                "currency": "IDR"
            }
        ]



        let mockGetAllTransactionList= jest.fn(() => Promise.resolve({
            status: 200,
            data: respTransactions
        }));


        mockGetAllTransactionList.mockClear();
        AccountService.mockClear();
        AccountService.mockImplementation(() => {
            return {
                getAllTransactionList: mockGetAllTransactionList
            };
        })
        const renderedComponent = shallow(<TransactionHistoryFilter/>);

        renderedComponent.instance().checkBoxOnChange()

        expect(renderedComponent.state().sort).toBe(1);
        expect(mockGetAllTransactionList).toHaveBeenCalledWith(1);
    });

    it('should change the image', () => {
        const wrapper = shallow(<TransactionHistoryFilter />);

        wrapper.instance().imageSort()
    });


});
