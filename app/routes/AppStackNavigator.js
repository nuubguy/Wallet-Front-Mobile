import React from 'react';
import {createStackNavigator} from 'react-navigation';
import TransactionFilter from '../TransactionHistoryScreen/sections/TransactionHistoriesFilter';

const AppStackNavigator = createStackNavigator({
    TransactionFilterRT: TransactionFilter,
});

export default AppStackNavigator;
