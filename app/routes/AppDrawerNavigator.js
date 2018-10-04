import {
  createDrawerNavigator, DrawerItems, createSwitchNavigator, createStackNavigator,
} from 'react-navigation';
import {
  ScrollView, SafeAreaView, View, StyleSheet, Image, Text, TouchableOpacity, AsyncStorage, Dimensions,
} from 'react-native';
import React from 'react';
import * as config from '../config/Constant';
import HomeContainer from '../HomeScreen/views/HomeContainer';
import LoginContainer from '../LoginScreen/views/LoginContainer';
import LoginLoading from '../LoginScreen/views/LoginLoading';
import TopUpContainer from '../TransactionScreen/views/TopUpContainer';
import TransferContainer from '../TransferScreen/views/TransferContainer';
import TransactionHistoryFilter from '../TransactionHistoryScreen/sections/TransactionHistoryFilter';
import PayeeContainer from '../PayeeScreen/views/PayeeContainer';

const { width, height } = Dimensions.get('screen');

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

const signOutAsync = async (props) => {
  await AsyncStorage.clear();
  props.navigation.navigate('Auth');
};


const CustomDrawerComponent = props => (
  <SafeAreaView style={styles.container}>
    <ScrollView>
      <View style={styles.menu}>
        <Image style={styles.logo} source={config.LOGO_IMAGE} />
      </View>
      <DrawerItems {...props} />
      <View style={styles.menuLogout}>
        <TouchableOpacity style={{ flexDirection: 'row', paddingLeft: 10 }} onPress={() => signOutAsync(props)}>
          <Image style={{ width: 30, height: 30 }} source={config.LOGOUT_ICON} />
          <Text style={{
            paddingLeft: 30, alignItems: 'center', paddingTop: 5, fontWeight: 'bold',
          }}
          >
Logout
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  </SafeAreaView>
);

const AuthStack = createStackNavigator({ Login: LoginContainer });
const AppStack = createDrawerNavigator({
  Home: HomeContainer,
  'Top Up': TopUpContainer,
  Transfer: TransferContainer,
  'Transaction History': TransactionHistoryFilter,
  'Add Payee': PayeeContainer,
}, {
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    activeTintColor: '#0fb9b1',
  },
});

const AppDrawerNavigator = createSwitchNavigator({
  LoginLoading,
  App: AppStack,
  Auth: AuthStack,
}, {
  initialRouteName: 'LoginLoading',
});

export default AppDrawerNavigator;
