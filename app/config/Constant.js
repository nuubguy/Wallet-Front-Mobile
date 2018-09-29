const BASE_URL = 'http://localhost:8080/';
const config = {
    BASE_URL: `${BASE_URL}`,
    ACCOUNT_URL: `${BASE_URL}costumers/`,
    TRANSACTION_URL: `${BASE_URL}transactions/`,
    LOGO_IMAGE: require('../resources/images/zoomba-logo.png'),
    HOME_ICON: require('../resources/images/home-icon.png'),
    TOP_UP_ICON: require('../resources/images/topup-icon.png'),
    MINIMUM_TRX : 15000

};

module.exports = config;
