import {createDrawerNavigator, DrawerItems } from 'react-navigation';
import {
<<<<<<< HEAD
    ScrollView, SafeAreaView, View, StyleSheet, Image, Dimensions
=======
    ScrollView, SafeAreaView, View, StyleSheet, Image,
>>>>>>> master
} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('screen');

import HomeContainer from '../HomeScreen/views/HomeContainer';
<<<<<<< HEAD
import TopUpContainer from "../TransactionScreen/views/TopUpContainer";
import WithdrawContainer from "../TransactionScreen/views/WithdrawContainer";
import TransferContainer from "../TransferScreen/views/TransferContainer";
=======
import TopUpContainer from '../TransactionScreen/views/TopUpContainer';
import WithdrawContainer from '../TransactionScreen/views/WithdrawContainer';
import TransactionHistoryFilter from "../TransactionHistoryScreen/sections/TransactionHistoryFilter";
>>>>>>> master

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c1faff',
        height: '100%',
        // paddingLeft: 20
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0fb9b1',
        padding: 10,
        height: 160
    },
    logo: {
        height: 110,
        width: 110,
    },
});

const CustomDrawerComponent = props => (
    <SafeAreaView style={styles.container}>
        <ScrollView>
            <View style={styles.menu}>
                <Image style={styles.logo} source={require('../resources/images/zoomba-logo.png')}/>
            </View>
            <DrawerItems {...props} />
        </ScrollView>
    </SafeAreaView>
);


const AppDrawerNavigator = createDrawerNavigator({
<<<<<<< HEAD
    Home: HomeContainer,
    'Top Up': TopUpContainer,
    'Withdraw': WithdrawContainer,
    'Transfer': TransferContainer
=======
  Home: HomeContainer,
  'Top Up': TopUpContainer,
  Withdraw: WithdrawContainer,
  'Transaction History': TransactionHistoryFilter,
>>>>>>> master
}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        activeTintColor: '#b96e68',
    },
<<<<<<< HEAD
    drawerWidth: Math.min(height, width) * 0.5,
    initialRouteName : 'Top Up'
=======
    initialRouteName: 'Home',
>>>>>>> master
});

export default AppDrawerNavigator;
