import React from 'react';
import {
    View, StyleSheet, Image,
} from 'react-native';
import AppHeader from '../../routes/AppHeader';
import InputFilter from "./InputFilter";
import AccountService from "../../HomeScreen/views/AccountService";
import * as config from "../../config/Constant";
import {showMessage} from "react-native-flash-message";
import TransactionList from "./TransactionList";
import {
    Fab, Icon
} from 'native-base';
import * as stylesBase from "../../config/Base";
import {AccountData} from "../../config/Global";

export default class TransactionHistoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            amount: '',
            description: '',
            currentTransactions: [],
            sort: 0,
            isTrue: true,
        }
        this.username = AccountData.customerId;
        this.account = AccountData.accountId;
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.TRANSACTION_HISTORY_ICON}/>
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
        // if (value.match(/^[0-9]*$/g)) {
        //     this.setState(
        //         {
        //             amount: '',
        //         }
        //     )
        // }

        this.setState({
                amount: value
            }
        )
    }

    checkBoxOnChange = () => {
        this.state.sort= (this.state.sort !==1)? 1:2
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

            if (transactions.data.length === 0) {
                showMessage({
                    message: "Transaction Not Found",
                    type: "danger",
                    icon: "danger"
                });
            }
            this.setState({
                currentTransactions: transactions.data
            });
        }
        catch (e) {
            console.log(e)
        }
    }


    inputValidation() {
        let service = new AccountService(this.username, this.account, config.BASE_URL);
        let transactions = service.getAllTransactionList(this.state.sort)
        if (this.state.description !== '' && this.state.amount === '') {
            transactions = service.getTransactionListBasedOnDescription(this.state.description, this.state.sort)
        }
        if (this.state.description === '' && this.state.amount !== '') {
            transactions = service.getTransactionListBasedOnAmount(parseFloat(this.state.amount), this.state.sort)
        }
        if (this.state.description !== '' && this.state.amount !== '') {
            transactions = service.getTransactionListBasedOnAmountAndDescription(parseFloat(this.state.amount), this.state.description,
                this.state.sort)
        }
        return transactions;
    }

    imageSort = () =>{
        if(this.state.sort === 1){
            return <Icon name={'ios-arrow-up'}/>
        }
        else{
           return  <Icon name={'ios-arrow-down'}/>
        }
    }
    render() {
        return (
            <View style={stylesBase.CONTAINER}>
                <AppHeader title="Transaction History" data={this.props}/>
                <View style={stylesBase.LIST}>
                    <InputFilter inputOnChange={this.inputOnChange} handleSubmit={this.handleSubmit}
                                 showDialog={this.showDialog}
                                 handleCancel={this.handleCancel} dialogVisible={this.state.dialogVisible}
                                 amount={this.state.amount}
                                 descriptionOnChange={this.descriptionOnChange}
                                 checkBoxOnChange={this.checkBoxOnChange}/>
                    <TransactionList currentTransactions={this.state.currentTransactions}/>
                    <Fab
                        active={this.state.active}
                        direction="up"
                        containerStyle={{}}
                        style={{backgroundColor: '#5067FF'}}
                        position="bottomRight"
                        onPress={() => {
                            this.checkBoxOnChange();
                        }}
                    >
                        {
                            this.imageSort()
                        }
                    </Fab>
                </View>
            </View>
        );
    }
}
