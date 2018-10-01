import axios from "axios";
import Constant from "../../config/Constant";

export default class AccountService{
    constructor(customerId, accountId, baseUrl){
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
            let result = await AccountService.axiosGet(balanceUrl);
            this.account = result.data;
            return result;

        } catch (error) {
            throw error;
        }
    }

    static axiosGet(url){
        return axios.get(url);
    }


    getTransactionList() {
        let accountId = this.accountId;
        let baseUrl = this.baseUrl;
        let transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=5&description=&amount=&status=`;
        return axios.get(transactionListUrl).then((response) => {
            return {
                status: response.status,
                data: response.data.map((item) => {
                    function getTransactionType(item) {
                        if (item.credit === accountId || item.credit.accountId === accountId) {
                            return Constant.credit();
                        }

                        if (item.debit === accountId || item.debit.accountId === accountId) {
                            return Constant.debit();
                        }
                    }

                    return {
                        transactionId: item.transactionId,
                        transactionType: getTransactionType(item),
                        dateTime: item.dateTime,
                        amount: item.transactionAmount.amount,
                        currency: item.transactionAmount.currency,
                        description: item.description
                    }
                })
            }
        });
    }


    getAllTransactionList(sort) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&limitResultFromLatest=&description=&amount=&status=${sort}`;
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
                    currency: item.transactionAmount.currency,
                    description: item.description,
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
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }


    getTransactionListBasedOnDescription(description,sort) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=${description}&amount=&status=${sort}`;
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
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }

    getTransactionListBasedOnAmount(amount,sort) {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=&amount=${parseFloat(amount)}&status=${sort}`;
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
                    currency: item.transactionAmount.currency,
                    description: item.description,
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
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }

    getAllAndSortByAmount() {
        const accountId = this.accountId;
        const baseUrl = this.baseUrl;
        const transactionListUrl = `${baseUrl}/transactions/?accountId=${accountId}&
    limitResultFromLatest=&description=&amount=&status=1`;
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
                    currency: item.transactionAmount.currency,
                    description: item.description,
                };
            }),
        }));
    }



    postTransaction(transaction){
        let accountId = this.accountId;
        let customerId = this.customerId;
        let balance = transaction.balance.amount;

        let headers = {
            'Content-Type': 'application/json'
        };

        let getTransactionType = (transactionType, targetType) => {
            if(transactionType === targetType){
                return accountId;

            }
            return "";
        };

        let transactionRequest = {
            debitAccountId: getTransactionType(transaction.transactionType, Constant.DEBIT),
            creditAccountId: getTransactionType(transaction.transactionType, Constant.CREDIT),
            transactionId: null,
            dateTime: null,
            description: transaction.description,
            transactionAmount: {
                amount: transaction.amount,
                currency: 'IDR'
            },

        };
        let postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transactionRequest, {headers : headers}).then((response) =>{

            return{
                status: response.status,
                data: response.data
            }
        }).catch((error) =>{

            let errorData;

            if(error.response.status === 403){
                errorData = error.response.data.message;
            }

            if(error.response.status === 400){
                errorData = error.response.data.errors[0].defaultMessage;
            }

            let friendlyError = {
                status: error.response.status,
                data: errorData
            };

            throw friendlyError;
        });

    }
    postTransfer(transfer){
        let balance = this.account.balance.amount;

        let headers = {
            'Content-Type': 'application/json'
        };

        let transferRequest = {
            transactionId: null,
            credit: transfer.accountId,
            debit: this.account,
            balance: {
                amount: balance,
                currency: 'IDR'
            },
            dateTime: null,
            transactionAmount: {
                amount: transfer.amount,
                currency: 'IDR'
            },
            description: transfer.description
        };

        let postTransactionUrl = `${this.baseUrl}/transactions`;
        return axios.post(postTransactionUrl, transferRequest, {headers : headers});

    }
}
