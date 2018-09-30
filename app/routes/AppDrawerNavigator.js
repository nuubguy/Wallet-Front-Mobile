import {createDrawerNavigator, DrawerItems } from 'react-navigation';
import {
    ScrollView, SafeAreaView, View, StyleSheet, Image, Dimensions
} from 'react-native';
import React from 'react';
const { width, height } = Dimensions.get('screen');

import HomeContainer from '../HomeScreen/views/HomeContainer';
import TopUpContainer from "../TransactionScreen/views/TopUpContainer";
import WithdrawContainer from "../TransactionScreen/views/WithdrawContainer";
import TransferContainer from "../TransferScreen/views/TransferContainer";

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
    Home: HomeContainer,
    'Top Up': TopUpContainer,
    'Withdraw': WithdrawContainer,
    'Transfer': TransferContainer
}, {
    contentComponent: CustomDrawerComponent,
    contentOptions: {
        activeTintColor: '#b96e68',
    },
    drawerWidth: Math.min(height, width) * 0.5,
    initialRouteName : 'Top Up'
});

export default AppDrawerNavigator;
