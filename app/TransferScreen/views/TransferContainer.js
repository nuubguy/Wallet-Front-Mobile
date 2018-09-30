import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import TransferForm from "../sections/TransferForm";
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";
import AccountService from "../../HomeScreen/views/AccountService";
import {showMessage} from "react-native-flash-message";
import Balance from "../../HomeScreen/sections/Balance";
import PropTypes from "prop-types";
import AppHeader from "../../routes/AppHeader";

//represent amount needed to restore something to its former level
export default class TransferContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            account: '',
            isDisabled: true,
            balance: {
                amount: '',
                currency: ''
            },
            transactionType: config.CREDIT

        }
        this.transactionType = this.props.type;
        this.username = 'C00000001';
        this.account = 'A00000001';
        this.service = new AccountService(this.username, this.account, config.BASE_URL);
        this.getBalance();

    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.TRANSFER_ICON}/>
        ),
    };

    render() {
        return (
            <View>

                <View style={styles.container}>
                    <AppHeader title='Transfer' data={this.props}/>
                    <View style={styles.box}>
                        <Balance data={this.state.balance}/>
                    </View>
                    <View style={styles.box}>
                        <TransferForm
                            account={this.state.account}
                            onChangeAccount={this.handleChangeAccount}
                            amount={this.state.amount}
                            onChangeAmount={this.handleChangeAmount}
                            description={this.state.description}
                            onChangeDescription={this.handleChangeDescription}
                            onPressSubmit={this.handleSubmit}
                            valid={this.state.isDisabled}
                        />
                    </View>
                </View>
            </View>
        );
    }

    isValidAmount(Amount) {
        if (Amount.replace('.', '') > config.MINIMUM_TRX) {
            return true;
        }
        return false;
    }

    handleChangeAccount = (account) => {
        this.setState({account: account});
    };

    handleChangeAmount = (amount) => {
        let inAmount = amount.replace(/[^0-9]/g, '');
        this.setState({isDisabled: true})
        if (this.isValidAmount(inAmount)) {
            this.setState({isDisabled: false})
        }
        this.setState({amount: inAmount});
    };

    handleChangeDescription = (description) => {
        this.setState({description: description});
    };

    getBalance = async () => {
        try {
            let response = await this.service.getAccount();
            this.setState({
                balance: {
                    amount: response.data.balance.amount,
                    currency: response.data.balance.currency
                }
            })
        }
        catch (error) {
            showMessage({
                message: "Something Error",
                description: error.data,
                type: "danger",
                icon: "danger"
            });
            console.log(error)
        }

    }

    handleSubmit = () => {

        let jsonRequest = {
            accountId: this.state.account,
            amount: this.state.amount.replace('.', ''),
            description: this.state.description,
            balance: this.state.balance
        }

        this.service.postTransfer(jsonRequest)
            .then(() => {
                showMessage({
                    message: "Transaction Success",
                    description: "Please kindly check your wallet balance",
                    type: "success",
                    icon: "success"
                });
                this.props.navigation.navigate('Home')
            })
            .catch((error) => {
                showMessage({
                    message: "Transaction Fail",
                    description: error.data,
                    type: "danger",
                    icon: "danger"
                });
                console.log(error + 'error ini')
            });
    };
}
TransferContainer.propTypes = {
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
