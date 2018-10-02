import {createDrawerNavigator, DrawerItems} from 'react-navigation';
import {
    ScrollView, SafeAreaView, View, StyleSheet, Image, Dimensions,
} from 'react-native';
import React from 'react';

import HomeContainer from '../HomeScreen/views/HomeContainer';
import TopUpContainer from '../TransactionScreen/views/TopUpContainer';
import WithdrawContainer from '../TransactionScreen/views/WithdrawContainer';
import TransactionHistoryFilter from '../TransactionHistoryScreen/sections/TransactionHistoryFilter';
import TransferContainer from '../TransferScreen/views/TransferContainer';

const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c1faff',
        height: '100%',
    },
    menu: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0fb9b1',
        padding: 10,
        height: 160,
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

    Home: HomeContainer,
    'Top Up': TopUpContainer,
    Withdraw: WithdrawContainer,
    Transfer: TransferContainer,
    'Transaction History': TransactionHistoryFilter,

}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        activeTintColor: '#b96e68',
        drawerWidth: Math.min(height, width) * 0.5,
        initialRouteName: 'Home',
    },

});

export default AppDrawerNavigator;
