import React from 'react';
import {View, AsyncStorage, Image, StyleSheet, KeyboardAvoidingView, Text} from 'react-native';
import * as config from '../../config/Constant';
import LoginForm from "../sections/LoginForm";

export default class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this._bootstrapAsync();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={config.LOGO_IMAGE}/>
                </View>
                <View style={styles.welcome}>
                    <Text style={styles.h1}>
                        Welcome Back
                    </Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm
                        onChangeEmail={this.handleChangeEmail}
                        onChangePassword={this.handleChangePassword}
                        onPressSubmit={this.handleSubmit}/>
                </View>
            </KeyboardAvoidingView>
        );
    }

    handleChangeEmail = (email) => {
        this.setState({
            email: email
        })
    }

    handleChangePassword = (password) => {
        this.setState({
            password: password
        })
    }

    saveUserId = async () => {
        const customerId = this.state.email;
        try {
            let data = await AsyncStorage.removeItem('customerId')
        } catch (err) {
            console.log(`The error is: ${err}`)
        }
        await AsyncStorage.setItem('customerId', customerId);
    };

    handleSubmit = () => {
        this.saveUserId();
        this._signInAsync();
    }

    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Home');
    };
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0fb9b1',
    },
    welcome: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    h1: {
        fontSize: 30,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },
    formContainer: {
        flex: 2
    }
});
