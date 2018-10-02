import React from "react";
import {ActivityIndicator, AsyncStorage, StatusBar, View} from "react-native";

export default class LoginLoading extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
