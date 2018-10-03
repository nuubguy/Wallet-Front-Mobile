import React from 'react';
import { StyleSheet, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import AppDrawerNavigator from './app/routes/AppDrawerNavigator';
import Authenticate from './app/config/Authenticate';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AppDrawerNavigator/>
        <FlashMessage position="top" duration={3000} />
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
