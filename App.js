import React from 'react';
import {StyleSheet, View} from 'react-native';
import AppDrawerNavigator from './app/routes/AppDrawerNavigator';
import AppStackNavigator from './app/routes/AppStackNavigator';

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <AppDrawerNavigator/>

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
