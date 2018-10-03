// const BASE_URL = 'http://localhost:8080/';
// const BASE_URL = 'http://magnus.serveo.net/';
const BASE_URL = 'http://mitigo.serveo.net/';
const config = {
    BASE_URL: `${BASE_URL}`,
    ACCOUNT_URL: `${BASE_URL}costumers/`,
    TRANSACTION_URL: `${BASE_URL}transactions/`,
    LOGO_IMAGE: require('../resources/images/zoomba-logo.png'),
    HOME_ICON: require('../resources/images/home-icon.png'),
    TOP_UP_ICON: require('../resources/images/topup-icon.png'),
    BALANCE_ICON: require('../resources/images/balance-icon.png'),
    WITHDRAW_ICON: require('../resources/images/withdraw-icon.png'),
    TRANSFER_ICON: require('../resources/images/transfer-icon.png'),
    TRANSACTION_HISTORY_ICON: require('../resources/images/transaction-history.png'),
    MINIMUM_TRX: 15000,
    MAXIMUM_TRX: 50000000,
    DEBIT: 'debit',
    CREDIT: 'credit',
    IMAGE_DEBIT: require('../resources/images/debit.png'),
    IMAGE_CREDIT: require('../resources/images/credit.png'),
    LOGOUT_IMAGE: require('../resources/images/logout-icon.png'),
};

module.exports = config;
