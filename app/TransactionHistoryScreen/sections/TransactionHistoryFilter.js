import React from 'react';
import {
    View, StyleSheet, Image
} from 'react-native';
import AppHeader from '../../routes/AppHeader';
import InputFilter from "./InputFilter";
import AccountService from "../../HomeScreen/views/AccountService";
import * as config from "../../config/Constant";
import {showMessage} from "react-native-flash-message";
import TransactionList from "./TransactionList";
import {
    Fab
} from 'native-base';
import * as stylesBase from "../../config/Base";
import DetailTransactionList from "./DetailTransactionList";

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

export default class TransactionHistoryFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialogVisible: false,
            amount: '',
            description: '',
            currentTransactions: [],
            sort: 0,
            isTrue:true,
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
        if (value.match(/^[0-9]*$/g)){
            this.setState(
                {
                    amount:'',
                }
            )
        }

        this.setState({
                amount: value
            }
        )
    }

    checkBoxOnChange = () => {
        this.setState({
            sort: (this.state.sort!==1)? 1:2,
        })
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

            if (transactions.data.length===0){
                showMessage({
                    message: "no transactions",
                    description: "Please search again"+transactions.data.length,
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
        if(this.state.description!==''&&this.state.amount===''){
            transactions =service.getTransactionListBasedOnDescription(this.state.description,this.state.sort)
        }
        if (this.state.description===''&&this.state.amount!==''){
            transactions = service.getTransactionListBasedOnAmount(parseFloat(this.state.amount),this.state.sort)
        }
        if (this.state.description!==''&& this.state.amount!==''){
            transactions = service.getTransactionListBasedOnAmountAndDescription(parseFloat(this.state.amount),this.state.description,
                this.state.sort)
        }

        return transactions;
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
                <DetailTransactionList currentTransactions={this.state.currentTransactions}/>

                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => { this.checkBoxOnChange();}}>
                    <Image
                        style={{width: 20, height: 20}}
                        source={{uri: 'https://static.thenounproject.com/png/40256-200.png'}}
                    />
                </Fab>
            </View>
        );
    }
}
