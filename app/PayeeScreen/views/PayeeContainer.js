import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";
import AccountService from "../../HomeScreen/views/AccountService";
import {showMessage} from "react-native-flash-message";
import Balance from "../../HomeScreen/sections/Balance";
import PropTypes from "prop-types";
import AppHeader from "../../routes/AppHeader";
import PayeeForm from "../sections/PayeeForm";
import TransferForm from "../../TransferScreen/sections/TransferForm";

//represent amount needed to restore something to its former level
export default class PayeeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payeeAccount: '',
            payeeAccountName: '',
            payees: [],
            isDisabledSubmit: true,
        }
        this.username = 'C00000001';
        this.account = 'A00000001';
        this.service = new AccountService(this.username, this.account, config.BASE_URL);
        this.getInfoAccount();
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.PAYEE_ICON}/>
        ),
    };

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <AppHeader title='Payee' data={this.props}/>
                    <View style={styles.box}>
                        <PayeeForm
                            payeeAccount={this.state.payeeAccount}
                            payeeAccountName={this.state.payeeAccountName}
                            onChangeAccount={this.handleChangeAccount}
                            onPressCheck={this.handleClickCheck}
                            onPressSubmit={this.handleSubmit}
                            isDisabledSubmit={this.state.isDisabledSubmit}
                        />
                    </View>
                </View>
            </View>
        );
    }

    handleChangeAccount = (payeeAccount) => {
        this.setState({
            payeeAccount: payeeAccount,
            payeeAccountName: '',
            isDisabledSubmit: true
        });
    };

    getInfoAccount = async () => {
        try {
            let response = await this.service.getAccount();
            this.setState({
                payees: response.data.payees
            })
        }
        catch (error) {
            showMessage({
                message: "Something Error",
                description: error.data,
                type: "danger",
                icon: "danger"
            });
        }

    }

    handleClickCheck = () => {
        let accountId = this.state.payeeAccount;

        this.service.getAccountById(accountId)
            .then((response) => {
                if (response.data.accountId === this.account) {
                    showMessage(Object.assign({
                        message: "Oops!",
                        description: "You can not add payee with self",
                        type: "danger",
                        icon: "danger",
                    }, stylesBase.MESSAGE_FAIL));
                }
                else {
                    showMessage(Object.assign({
<<<<<<< HEAD
                        message: "Data found",
=======
                        message: "Account found",
>>>>>>> master
                        type: "success",
                        icon: "success",
                    }, stylesBase.MESSAGE_SUCCESS));
                    this.setState({
                        payeeAccountName: response.data.customerName,
                        isDisabledSubmit: false
                    })
                }

            })
            .catch(() => {
                showMessage({
                    message: "Oops!",
                    description: 'Account not found',
                    type: "danger",
                    icon: "danger"
                });

            });
    };

    handleSubmit = () => {
        let payees = [...this.state.payees,
            {
                accountId: this.state.payeeAccount,
                customerName: this.state.payeeAccountName
            }]

        this.service.putPayee(payees)
            .then(() => {
                showMessage(Object.assign({
                    message: "Add payee successful",
                    type: "success",
                    icon: "success",
                }, stylesBase.MESSAGE_SUCCESS));
                this.props.navigation.navigate('Transfer')
            })
            .catch((error) => {
                showMessage({
                    message: "Oops!",
                    description: error.data,
                    type: "danger",
                    icon: "danger"
                });

            });
    };
}
PayeeContainer.propTypes = {
    navigation: PropTypes.object,
    route: PropTypes.string
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        height: '100%'
    },
    box: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 20
    },
});
