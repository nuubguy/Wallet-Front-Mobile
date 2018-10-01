import React from 'react';
import {
    View, StyleSheet, Image
} from 'react-native';
import AppHeader from '../../routes/AppHeader';
import InputFilter from "./InputFilter";
import AccountService from "../../HomeScreen/views/AccountService";
import * as config from "../../config/Constant";
import TransactionList from "./TransactionList";
import {
    Fab
} from 'native-base';
import * as stylesBase from "../../config/Base";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#101010',
        flexDirection: 'row',
    },
    balance: {
        fontSize: 18,
        color: '#101010',
    },
    viewTable: {
        flexDirection: 'column',
        width: '100%',
    },
    right: {
        flexDirection: 'row',
    },
    ViewInput: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
});

export default class TransactionFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            amount: '',
            description: '',
            currentTransactions: [],
            sort: false
        }
        this.username = 'C00000001';
        this.account = 'A00000001';
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.TRANSACTION_HISTORY}/>
        ),
    };
    showDialog = () => {
        this.setState({
            dialogVisible: true,
        });
        this.setState(
            {
                description: '',
                amount: '',
            }
        )

    };

    handleCancel = () => {
        this.setState({dialogVisible: false});
    };

    handleSubmit = () => {
        this.componentDidMount();
        this.setState(
            {
                dialogVisible: false,
            }
        )
    };

    inputOnChange = (value) => {
        this.setState({
                amount: value
            }
        )
    }

    checkBoxOnChange = () => {
        console.log('aaa')
        this.setState(
            {
                sort: (this.state.sort === false) ? true : false
            }
        )
        this.componentDidMount();
    }

    descriptionOnChange = (value) => {
        this.setState({
                description: value
            }
        )
    }

    async componentDidMount() {

        try {
            let transactions = await this.inputValidation()
            let sortedTransactions = this.sort(transactions.data)
            this.setState({
                currentTransactions: sortedTransactions
            });
        }
        catch (e) {
            console.log(e)
        }
    }


    sort = (transaction) => {
        return transaction.sort((a, b) => {
            return (this.state.sort === false) ? a.amount - b.amount : b.amount - a.amount
        })
    }

    inputValidation() {
        let account = new AccountService(this.username, this.account, config.BASE_URL);
        let trxResponse = account.getAllTransactionList();
        if (this.state.description !== '' && this.state.amount === '') {
            trxResponse = account.getTransactionListBasedOnDescription(this.state.description.toLowerCase());
        }
        if (this.state.description === '' && this.state.amount !== '') {
            trxResponse = account.getTransactionListBasedOnAmount(this.state.amount);
        }
        if (this.state.description !== '' && this.state.amount !== '') {
            trxResponse = account.getTransactionListBasedOnAmountAndDescription(this.state.amount,
                this.state.description.toLowerCase());
        }

        return trxResponse;
    }


    render() {
        return (
            <View style={styles.container}>
                <AppHeader title="Transaction History" data={this.props}/>
                <InputFilter inputOnChange={this.inputOnChange} handleSubmit={this.handleSubmit}
                             showDialog={this.showDialog}
                             handleCancel={this.handleCancel} dialogVisible={this.state.dialogVisible}
                             amount={this.state.amount}
                             descriptionOnChange={this.descriptionOnChange} checkBoxOnChange={this.checkBoxOnChange}/>
                <TransactionList currentTransactions={this.state.currentTransactions}/>

            </View>
        );
    }
}
