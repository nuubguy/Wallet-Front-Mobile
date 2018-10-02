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
import SearchRecipientForm from "../sections/SearchRecipientForm";

//represent amount needed to restore something to its former level
export default class TransferContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            description: '',
            recipientAccountId: '',
            recipientAccountName: '',
            btnConfirmDisabled: true,
            btnCheckDisabled: true,
            balance: {
                amount: '',
                currency: '',

            },
            payees: [],
            isEditable: false,
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
                        <SearchRecipientForm
                            valid={this.state.btnCheckDisabled}
                            account={this.state.account}
                            onChangeAccount={this.handleChangeAccount}
                            onPressCheck={this.handleClickCheck}
                        />
                        <TransferForm
                            recipientAccountName={this.state.recipientAccountName}
                            amount={this.state.amount}
                            onChangeAmount={this.handleChangeAmount}
                            description={this.state.description}
                            onChangeDescription={this.handleChangeDescription}
                            onPressSubmit={this.handleSubmit}
                            valid={this.state.btnConfirmDisabled}
                            isEditable={this.state.isEditable}
                        />
                    </View>
                </View>
            </View>
        );
    }

    isValidAmount(Amount) {
        return Amount >= config.MINIMUM_TRX && Amount <= config.MAXIMUM_TRX;
    }

    handleClickCheck = () => {

        let inputAccountId = this.state.recipientAccountId;
        for (let i = 0; i < this.state.payees.length; i++) {
            if(this.state.payees[i].accountId === inputAccountId){
                this.setState({
                    isEditable: true,
                    recipientAccountName: this.state.payees[i].customer.name
                });
                return;
            }
            showMessage({
                message: "Payee is not link with your account",
                type: "danger",
                icon: "danger"
            });
        }
    };

    handleChangeAccount = (recipientAccount) => {
        this.setState({
            recipientAccountId: recipientAccount,
            recipientAccountName: '',
            isEditable: false,
        });
    };

    handleChangeAmount = (amount) => {
        let inAmount = amount.replace(/[^0-9]/g, '');
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
                    currency: response.data.balance.currency,
                },
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
            console.log(error)
        }

    }

    handleSubmit = () => {
        let jsonRequest = {
            amount: this.state.amount.replace('.', ''),
            description: this.state.description,
            accountId: this.state.recipientAccountId
        }

        this.service.postTransfer(jsonRequest)
            .then(() => {
                showMessage(Object.assign({
                    message: "Transfer successful",
                    description: "Please check your balance",
                    type: "success",
                    icon: "success",
                }, stylesBase.MESSAGE_SUCCESS));
                this.props.navigation.navigate('Home')
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
