import axios from 'axios';
import Constant from '../../config/Constant';

export default class AccountService {
  constructor(customerId, accountId, baseUrl) {
    this.customerId = customerId;
    this.accountId = accountId;
    this.baseUrl = baseUrl;
  }

  async getAccount() {
    const accountId = this.accountId;
    const customerId = this.customerId;
    const baseUrl = this.baseUrl;
    const balanceUrl = `${baseUrl}/customers/${customerId}/accounts/${accountId}`;
    try {
      const result = await AccountService.axiosGet(balanceUrl);
      this.account = result.data;
      return result;
    } catch (error) {
      throw error;
    }
  }

  getAccountById(accountId) {
    const getCustomerUrl = `${this.baseUrl}/accounts?accountId=${accountId}`;
    try {
      const result = AccountService.axiosGet(getCustomerUrl);
      this.account = result.data;
      return result;
    } catch (error) {
      throw error;
    }
  }

  static axiosGet(url, credentials) {
    return axios.get(url, credentials);
  }


  getTransactionList() {
    const accountId = this.accountId;
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5&description=&amount=&status=`;
    return axios.get(transactionListUrl).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return 'TOP UP';
            }
            return 'TRANSFER from';
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return 'TRANSFER';
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          transactionType: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description,
          subTransactionType: getSubTransactionType(item),
        };
      }),
    }));
  }


  getAllTransactionList(sort) {
    const accountId = this.accountId;
    const baseUrl = this.baseUrl;
    let transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=${sort}`;
    if (sort === 0) {
      transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=`;
    }
    return axios.get(transactionListUrl).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return 'TOP UP';
            }
            return 'TRANSFER from';
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return 'TRANSFER';
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          transactionType: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description,
          subTransactionType: getSubTransactionType(item),
        };
      }),
    }));
  }

  getLatestTransaction() {
    const accountId = this.accountId;
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5&description=&amount=&status=`;
    return axios.get(transactionListUrl).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return 'TOP UP';
            }
            return 'TRANSFER from';
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return 'TRANSFER';
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          transactionType: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description,
          subTransactionType: getSubTransactionType(item),
        };
      }),
    }));
  }


  getTransactionListBasedOnDescription(description, sort) {
    const accountId = this.accountId;
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=&status=${sort}`;
    return axios.get(transactionListUrl).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return 'TOP UP';
            }
            return 'TRANSFER from';
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return 'TRANSFER';
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          transactionType: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description,
          subTransactionType: getSubTransactionType(item),
        };
      }),
    }));
  }

  getTransactionListBasedOnAmount(amount, sort) {
    const accountId = this.accountId;
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=&amount=${parseFloat(amount)}&status=${sort}`;
    return axios.get(transactionListUrl).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return 'TOP UP';
            }
            return 'TRANSFER from';
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return 'TRANSFER';
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          transactionType: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description,
          subTransactionType: getSubTransactionType(item),
        };
      }),
    }));
  }

  getTransactionListBasedOnAmountAndDescription(amount, description) {
    const accountId = this.accountId;
    const baseUrl = this.baseUrl;
    const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=${amount}`;
    return axios.get(transactionListUrl).then(response => ({
      status: response.status,
      data: response.data.map((item) => {
        function getTransactionType(item) {
          if (item.credit === accountId || item.credit.accountId === accountId) {
            if (getSubTransactionType(item).length === 0) {
              return 'TOP UP';
            }
            return 'TRANSFER from';
          }

          if (item.debit === accountId || item.debit.accountId === accountId) {
            return 'TRANSFER';
          }
        }

        function getSubTransactionType(item) {
          if (item.credit.accountId === accountId) {
            if (item.debit.accountId !== 'CASH ACCOUNT') {
              return `${item.debit.customer.name}-${item.debit.accountId}`;
            }
            return '';
          }

          if (item.debit.accountId === accountId) {
            if (item.credit.accountId !== 'CASH ACCOUNT' || item.credit !== 'CASH ACCOUNT') {
              return `to ${item.credit.customer.name}-${item.credit.accountId}`;
            }
            return '';
          }
        }

        return {
          transactionId: item.transactionId,
          transactionType: getTransactionType(item),
          dateTime: item.dateTime,
          amount: item.transactionAmount.amount,
          currency: item.transactionAmount.currency,
          description: item.description,
          subTransactionType: getSubTransactionType(item),
        };
      }),
    }));
  }


  postTransaction(transaction) {
    const accountId = this.accountId;

    const headers = {
      'Content-Type': 'application/json',
    };

    const getTransactionType = (transactionType, targetType) => {
      if (transactionType === targetType) {
        return accountId;
      }
      return '';
    };

    const transactionRequest = {
      debitAccountId: getTransactionType(transaction.transactionType, Constant.DEBIT),
      creditAccountId: getTransactionType(transaction.transactionType, Constant.CREDIT),
      transactionId: null,
      dateTime: null,
      description: transaction.description,
      transactionAmount: {
        amount: transaction.amount,
        currency: 'IDR',
      },

    };
    const postTransactionUrl = `${this.baseUrl}/transactions`;
    return axios.post(postTransactionUrl, transactionRequest, { headers }).then(response => ({
      status: response.status,
      data: response.data,
    })).catch((error) => {
      let errorData;

      if (error.response.status === 403) {
        errorData = error.response.data.message;
      }

      if (error.response.status === 400) {
        errorData = error.response.data.errors[0].defaultMessage;
      }

      const friendlyError = {
        status: error.response.status,
        data: errorData,
      };

      throw friendlyError;
    });
  }

  postTransfer(transfer) {
    const balance = this.account.balance.amount;

    const headers = {
      'Content-Type': 'application/json',
    };

    const transferRequest = {
      transactionId: null,
      creditAccountId: transfer.accountId,
      debitAccountId: this.account.accountId,
      balance: {
        amount: balance,
        currency: 'IDR',
      },
      dateTime: null,
      transactionAmount: {
        amount: transfer.amount,
        currency: 'IDR',
      },
      description: transfer.description,
    };

    const postTransactionUrl = `${this.baseUrl}/transactions`;
    return axios.post(postTransactionUrl, transferRequest, { headers }).then(response => ({
      status: response.status,
      data: response.data,
    })).catch((error) => {
      let errorData;

      if (error.response.status === 403) {
        errorData = error.response.data.message;
      }

      if (error.response.status === 400) {
        errorData = error.response.data.errors[0].defaultMessage;
      }

      const friendlyError = {
        status: error.response.status,
        data: errorData,
      };

      throw friendlyError;
    });
  }

  putPayee(payees) {
    const customerId = this.customerId;
    const accountId = this.accountId;

    const headers = {
      'Content-Type': 'application/json',
    };

    const transferRequest = {
      accountId,
      payees,
    };

    const putPayeeUrl = `${this.baseUrl}/customers/${customerId}/accounts`;

    return axios.put(putPayeeUrl, transferRequest, { headers })
      .then(response => ({
        status: response.status,
        data: response.data,
      }))
      .catch(error => ({
        status: error.status,
        data: error.data,
      }));
  }
}
