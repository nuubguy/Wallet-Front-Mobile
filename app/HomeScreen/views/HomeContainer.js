import React from 'react';
import {StyleSheet, View, Text, Image, AsyncStorageStatic as AsyncStorage} from 'react-native';
import Balance from '../sections/Balance';
import Username from '../sections/Username';
import AccountService from './AccountService';
import * as config from '../../config/Constant';
import * as stylesBase from '../../config/Base';
import AppHeader from "../../routes/AppHeader";
import TransactionHeader from "../../TransactionHistoryScreen/sections/TransactionHeader";
import {AccountData} from "../../config/Global";
import {showMessage} from "react-native-flash-message";

export default class HomeContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            balance: {
                amount: '',
                currency: ''
            },
            transactions: [],
        }
        this.username = AccountData.customerId;
        this.account = AccountData.accountId;
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <View>
                <Image style={stylesBase.IMAGE_MENU} source={config.HOME_ICON}/>
            </View>
        ),
    };


    async componentDidMount() {
        try {
            let service = new AccountService(this.username, this.account, config.BASE_URL);
            let transactions = await service.getLatestTransaction()
            let result = await service.getAccount();
            this.setState({
                username: result.data.customer.name,
                balance: result.data.balance,
                transactions: transactions.data
            });
        }
        catch (e) {
        }
    }

    render() {
        return (
            <View style={stylesBase.CONTAINER}>
                <AppHeader title='Home' data={this.props}/>
                <View>
                    <View style={styles.row}>
                            <Username data={this.state.username}/>
                    </View>
                    <View style={styles.box}>
                        <Balance style={styles.balance} data={this.state.balance}/>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <TransactionHeader data={this.state.transactions} navigate={this.props.navigation}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    hello: {
        fontSize: 24,
    },
    row: {
        borderBottomWidth: 2,
        borderBottomColor: '#131412',
        width: '100%',
        padding: 10,
        paddingLeft: 20
    },
    rowBalance: {
        borderBottomWidth: 2,
        borderBottomColor: '#131412',
        width: '100%',
        padding: 10,
        paddingLeft: 20,
        backgroundColor: 'white'
    },
    transaction: {
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#ddd',
        shadowColor: '#000',
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        padding: 5,
        height: '70%'
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
        padding: 20,
    },
});
