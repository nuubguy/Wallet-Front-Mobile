/* global expect it describe */
import axios from 'axios';
import AccountService from './accountService';

jest.mock('axios');

describe('accountService', () => {
  const TestAccount = () => new AccountService('C00000001', 'A00000001', 'http://localhost:3000');

  describe('getAccountBalance', async () => {
    it('should get account balance from API', async () => {
      const resp = { amount: 5000000.0, currency: 'IDR' };
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: resp,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAccount();

      expect(result.status).toBe(200);
      expect(result.data.amount).toBe(5000000.0);
      expect(result.data.currency).toBe('IDR');
    });
  });

  describe('getCustomerInfo', async () => {
    it('should fetch info of customer account from API', async () => {
      const resp = {
        customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
      };
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: resp,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAccount();

      expect(result.status).toBe(200);
      expect(result.data.customerId).toBe('C00000001');
      expect(result.data.name).toBe('nofanto');
    });
  });

  describe('getTransactionList', () => {
    it('should fetch last 5 transactions of customer account', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002', name: 'customer 1', info: 'customer 1 info', disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004', name: 'customer 2', info: 'customer 2 info', disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionList();

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });
  });

  describe('getAllTransactionList', () => {
    it('should fetch with default sort by date', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAllTransactionList(0);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });

    it('should fetch with sort by amount ascending', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 10000000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getAllTransactionList(1);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });
  });

  describe('getTransactionListBasedOnDescription', () => {
    it('should fetch with description and default sort by date', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionListBasedOnDescription('beli mobil', 0);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });
  });

  describe('getTransactionListBasedOnAmount', () => {
    it('should fetch with filter by amount', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionListBasedOnAmount(500000, 0);

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });
  });

  describe('getTransactionListBasedOnAmountAndDescription', () => {
    it('should fetch with filter by amount and description', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getTransactionListBasedOnAmountAndDescription(500000, 'beli mobil');

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });
  });

  describe('getLatestTransaction', () => {
    it('should fetch the latest transaction', async () => {
      const transactionList = [{
        transactionId: 'T00000007',
        debit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000002',
            name: 'customer 1',
            info: 'customer 1 info',
            disabled: false,
          },
          balance: { amount: 1500000.0, currency: 'IDR' },
        },
        credit: {
          accountId: 'A00000002',
          customer: {
            customerId: 'C00000004',
            name: 'customer 2',
            info: 'customer 2 info',
            disabled: false,
          },
          balance: { amount: 8500000.0, currency: 'IDR' },
        },
        dateTime: '2018-09-15T16:22:04.601',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000006',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.569',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000005',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.537',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000004',
        debit: 'A00000002',
        credit: 'A00000001',
        dateTime: '2018-09-15T16:22:04.509',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }, {
        transactionId: 'T00000003',
        debit: 'A00000001',
        credit: 'A00000002',
        dateTime: '2018-09-15T16:22:04.485',
        transactionAmount: { amount: 500000.0, currency: 'IDR' },
      }];
      axios.get.mockImplementationOnce(() => Promise.resolve({
        status: 200,
        data: transactionList,
      }));

      const testAccount = TestAccount();

      const result = await testAccount.getLatestTransaction();

      expect(result.status).toBe(200);
      expect(result.data.length).toBe(5);
      expect(result.data[0].transactionId).toBe('T00000007');
      expect(result.data[3].transactionType).toBe('credit');
      expect(result.data[4].transactionType).toBe('debit');
    });
  });


  describe('postTransaction', async () => {
    it('should success post transaction to API', async () => {
      const respBalance = { amount: 5000000.0, currency: 'IDR' };
      const respCustomerInfo = {
        customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
      };

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respBalance,
      })).mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respCustomerInfo,
      }));


      const transactionResponse = {
        transactionId: 'T00000006',
        debit: null,
        credit: {
          accountId: 'A00000001',
          customer: {
            customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
          },
          balance: { amount: 1.1E7, currency: 'IDR' },
        },
        dateTime: '2018-09-15T19:02:17.035',
        transactionAmount: { amount: 1000000.0, currency: 'IDR' },
      };
      axios.post.mockImplementationOnce(() => Promise.resolve({
        status: 201,
        data: transactionResponse,
      }));

      const testAccount = TestAccount();
      await testAccount.getAccount();
      const result = await testAccount.postTransaction({ transactionType: 'credit', amount: 1000000 });

      expect(result.data.transactionId).toBe('T00000006');
      expect(result.status).toBe(201);
    });

    it('should failed post transaction to API', async () => {
      const respBalance = { amount: 5000000.0, currency: 'IDR' };
      const respCustomerInfo = {
        customerId: 'C00000001', name: 'nofanto', info: 'chip', disabled: false,
      };

      axios.get.mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respBalance,
      })).mockReturnValueOnce(Promise.resolve({
        status: 200,
        data: respCustomerInfo,
      }));


      const transactionResponse = {
        timestamp: '2018-09-22T20:03:33.670+0000',
        status: 403,
        error: 'Forbidden',
        message: 'Insufficient balance',
        path: '/transactions',
      };
      axios.post.mockImplementationOnce(() => Promise.reject({
        response: {
          status: 403,
          data: transactionResponse,
        },
      }));


      const testAccount = TestAccount();
      await testAccount.getAccount();
      let result;
      try {
        result = await testAccount.postTransaction({ transactionType: 'credit', amount: 1000000 });
      } catch (e) {
        result = e;
      }

      expect(result.status).toBe(403);
      expect(result.data).toBe('Insufficient balance');
    });
  });
  describe('getAccountProfile', () => {

    it('should fetch info of customer account from API with basic authentication when the account wrong', async () => {
      const testAccount = TestAccount();
      try {
        const result = await testAccount.getAccountProfile('C00000001', 'P@ssw0rd2');
      } catch (e) {
        expect(e.response.status).toBe(401);
      }
    });
  });
});
