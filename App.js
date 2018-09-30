import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppDrawerNavigator from './app/routes/AppDrawerNavigator';
import FlashMessage from "react-native-flash-message";

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <AppDrawerNavigator/>
                <FlashMessage position="top" />
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
