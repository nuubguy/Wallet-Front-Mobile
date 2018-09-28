import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppDrawerNavigator from './app/routes/AppDrawerNavigator';
import HomeContainer from "./app/HomeScreen/views/HomeContainer";
import {createDrawerNavigator} from 'react-navigation';
import TransactionHistoryContainer from "./app/TransactionHistoryScreen/TransactionHistoryContainer";

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppDrawerNavigator />
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
