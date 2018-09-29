import axios from 'axios';

export default class AccountService {
    constructor(customerId, accountId, baseUrl) {
        this.customerId = customerId;
        this.accountId = accountId;
        this.baseUrl = baseUrl;
    }

    getAccount() {
        const accountId = this.accountId;
        const customerId = this.customerId;
        const baseUrl = this.baseUrl;
        const balanceUrl = `${baseUrl}/customers/${customerId}/accounts/${accountId}`;
        return axios.get(balanceUrl);
    }

    getCustomerInfo() {
        const customerId = this.customerId;
        const baseUrl = this.baseUrl;
        const customerUrl = `${baseUrl}/customers/${customerId}`;
        return axios.get(customerUrl).then((response) => {
            this.customerInfo = response.data;
            return response;
        });
    }

    getTransactionList() {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5`;
        return axios.get(transactionListUrl).then(response => ({
            status: response.status,
            data: response.data.map((item) => {
                function getTransactionType(item) {
                    if (item.credit === accountId || item.credit.accountId === accountId) {
                        return 'credit';
                    }

                    if (item.debit === accountId || item.debit.accountId === accountId) {
                        return 'debit';
                    }
                }

                return {
                    transactionId: item.transactionId,
                    transactionType: getTransactionType(item),
                    dateTime: item.dateTime,
                    amount: item.transactionAmount.amount,
                };
            }),
        }));
    }

    postTransaction(transaction) {
        const accountId = this.accountId;
        const customerId = this.customerId;
        const balance = this.balance;

        const headers = {
            'Content-Type': 'application/json',
        };

        const getTransactionType = (transactionType, targetType) => {
            if (transactionType === targetType) {
                return {
                    accountId,
                    customer: {
                        customerId,
                        // name: this.customerInfo.name,
                        // info: this.customerInfo.info,
                        // disabled: this.customerInfo.disabled,
                        name: 'nofanto',
                        info: 'chip',
                        disabled: false,
                    },
                };
            }
            return null;
        };

        const transactionRequest = {
            transactionId: null,
            credit: getTransactionType(transaction.transactionType, 'credit'),
            debit: getTransactionType(transaction.transactionType, 'debit'),
            balance: {
                amount: balance,
                currency: 'IDR',
            },
            dateTime: null,
            transactionAmount: {
                amount: transaction.amount,
                currency: 'IDR',
            },
        };

        const postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transactionRequest, {headers});
    }
}
