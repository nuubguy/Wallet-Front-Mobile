import { createDrawerNavigator, DrawerItems } from 'react-navigation';
import {
  ScrollView, SafeAreaView, View, StyleSheet, Image,
} from 'react-native';
import React from 'react';

import HomeContainer from '../HomeScreen/views/HomeContainer';
import TopUpContainer from '../TransactionScreen/views/TopUpContainer';
import WithdrawContainer from '../TransactionScreen/views/WithdrawContainer';
import TransactionFilter from "../TransactionHistoryScreen/sections/TransactionHistoryFilter";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fb9b1',
  },
  logo: {
    height: 100,
    width: 100,
    borderRadius: 60,
  },
});

const CustomDrawerComponent = props => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.menu}>
        <Image style={styles.logo} source={require('../resources/images/zoomba-logo.png')} />
      </View>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
);


const AppDrawerNavigator = createDrawerNavigator({
  Home: HomeContainer,
  'Top Up': TopUpContainer,
  Withdraw: WithdrawContainer,
  'Transaction History': TransactionFilter,
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#0fb9b1',
  },
  initialRouteName: 'Home',
});

export default AppDrawerNavigator;
