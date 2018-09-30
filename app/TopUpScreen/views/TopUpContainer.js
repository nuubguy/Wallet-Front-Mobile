import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppHeader from "../../routes/AppHeader";
import TopUpForm from "../sections/TopUpForm";
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";
import AccountService from "../../HomeScreen/views/AccountService";
import {showMessage} from "react-native-flash-message";
import Balance from "../../HomeScreen/sections/Balance";

//represent amount needed to restore something to its former level
export default class TopUpContainer extends Component {

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

        }
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
            <View style={styles.container}>
                <AppHeader title='Top Up' data={this.props}/>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <View>
                            <Balance data={this.state.balance}/>
                        </View>
                        <TopUpForm
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
        let finalAmount = this.currencyFormatter(inAmount);
        this.setState({isDisabled: true})
        if (this.isValidAmount(inAmount)) {
            this.setState({isDisabled: false})
        }
        this.setState({amount: finalAmount});
    };

    handleChangeDescription = (description) => {
        this.setState({description: description});
    };

    getBalance = async () => {
        try {
            let response = await this.service.getAccount();
            this.setState({
                balance: {
                    amount : response.data.balance.amount,
                    currency : response.data.balance.currency
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
            transactionType: config.CREDIT,
            amount: this.state.amount.replace('.', ''),
            description : this.state.description,
            balance: this.state.balance
        }

        this.service.postTransaction(jsonRequest)
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
            });
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    body: {
        alignItems: 'center',
        padding: 10,
    },
    row: {
        borderBottomWidth: 2,
        borderBottomColor: '#131412',
        width: '100%',
        padding: 10,
    },
});
