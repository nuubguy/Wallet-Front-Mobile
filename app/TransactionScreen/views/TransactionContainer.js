import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import TransactionForm from "../sections/TransactionForm";
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";
import AccountService from "../../HomeScreen/views/AccountService";
import {showMessage} from "react-native-flash-message";
import Balance from "../../HomeScreen/sections/Balance";
import PropTypes from "prop-types";

//represent amount needed to restore something to its former level
export default class TransactionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
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
            <Image style={stylesBase.IMAGE_MENU} source={config.TOP_UP_ICON}/>
        ),
    };


    currencyFormatter(amount) {
        const formatter = new Intl.NumberFormat('en-ID');
        return formatter.format(amount);
    }

    render() {
        return (
            <View>

                <View style={styles.container}>
                    <View style={styles.box}>
                        <Balance data={this.state.balance}/>
                    </View>
                    <View style={styles.box}>
                        <TransactionForm
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

    handleChangeAmount = (amount) => {
        let inAmount = amount.replace(/[^0-9]/g, '');
        // let finalAmount = this.currencyFormatter(inAmount);
        this.setState({btnConfirmDisabled: true})
        if (this.isValidAmount(inAmount)) {
            this.setState({btnConfirmDisabled: false})
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
        }

    }

    handleSubmit = () => {

        let jsonRequest = {
            transactionType: this.transactionType,
            amount: this.state.amount.replace('.', ''),
            description: this.state.description,
            balance: this.state.balance
        }

        this.service.postTransaction(jsonRequest)
            .then(() => {
                showMessage(Object.assign({
                    message: "Transaction successful",
                    description: "Please check your balance",
                    type: "success",
                    icon: "success",
                },stylesBase.MESSAGE_SUCCESS));
                this.props.navigation.navigate('Home')
            })
            .catch((error) => {
                showMessage({
                    message: "Transaction Fail",
                    description: error.data,
                    type: "danger",
                    icon: "danger"
                });
            });
    };
}
TransactionContainer.propTypes = {
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
