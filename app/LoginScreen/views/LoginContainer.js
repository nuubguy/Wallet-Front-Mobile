import React from 'react';
import {View, AsyncStorage, Image, StyleSheet, KeyboardAvoidingView, Text} from 'react-native';
import * as config from '../../config/Constant';
import LoginForm from "../sections/LoginForm";
import FlashMessage, {showMessage} from "react-native-flash-message";
import * as stylesBase from "../../config/Base";
import axios from 'axios';
import {AccountData} from "../../config/Global";

export default class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customerId: '',
            password: '',
            isLogin: false
        }
    }

    static navigationOptions = {header: null};

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

    handleChangeEmail = (customerId) => {
        this.setState({
            customerId: customerId
        })
    }

    handleChangePassword = (password) => {
        this.setState({
            password: password
        })
    }


    handleSubmit = async () => {
        await this._signInAsync();
        if (this.state.isLogin) {
            this.props.navigation.navigate('Home');
        }
    }

    _signInAsync = async () => {

        const getCustomerUrl = `${config.BASE_URL}/customers/${this.state.customerId}`;
        try {
            const result = await axios.get(getCustomerUrl, {
                withCredentials: true,
                auth: {
                    username: this.state.customerId,
                    password: this.state.password,
                },
            });
            if (result.status === 200) {
                this.setState({
                    isLogin: true
                })
                AccountData.customerId = this.state.customerId;
                AccountData.accountId = result.data.accountList[0].accountId;
                await AsyncStorage.setItem('username', this.state.customerId);
            }
            else {
                showMessage(Object.assign({
                    message: "Invalid username or password",
                    icon: "danger",
                }, stylesBase.MESSAGE_FAIL));
            }

        } catch (e) {
            showMessage(Object.assign({
                message: "Invalid username or password",
                icon: "danger",
            }, stylesBase.MESSAGE_FAIL));

            console.log(e);
        }
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
