const BASE_URL = 'http://localhost:8080/';
const config = {
  BASE_URL: `${BASE_URL}`,
  ACCOUNT_URL: `${BASE_URL}costumers/`,
  TRANSACTION_URL: `${BASE_URL}transactions/`,
  MESSAGE_USERNAME_NOT_FOUND: 'Oops .. ! Username not found',
  MESSAGE_USERNAME_ERROR: 'Oops .. ! Something Error',
  MESSAGE_ENDBALANCE_NOT_FOUND: 'Oops .. ! End balance not found',
  MESSAGE_ENDBALANCE_ERROR: 'Oops .. ! Something Error',
  PREFIX_TRANSACTION: 'TRX-',
  MESSAGE_POST_TRANSACTION_SUCCESS: 'SUCCESS',
  MESSAGE_POST_TRANSACTION_FAILED: message => `Oops..! ${message} `,

};

module.exports = config;
