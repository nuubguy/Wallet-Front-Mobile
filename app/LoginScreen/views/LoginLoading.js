import React from "react";
import {ActivityIndicator, AsyncStorage, StatusBar, View} from "react-native";
import {AccountData} from "../../config/Global";

export default class LoginLoading extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        console.log(this.props.navigation)
        const username = await AsyncStorage.getItem('username');
        this.props.navigation.navigate(username ? 'App' : 'Auth');
        this.props.navigation.navigate(AccountData.accountId ? 'App' : 'Auth');
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
