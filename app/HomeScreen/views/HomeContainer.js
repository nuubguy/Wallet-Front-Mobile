import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Balance from '../sections/Balance';
import Username from '../sections/Username';
import AccountService from './AccountService';
import * as config from '../../config/Constant';
import * as stylesBase from '../../config/Base';
import AppHeader from "../../routes/AppHeader";
import TransactionHeader from "../../TransactionHistoryScreen/sections/TransactionHeader";


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
        this.username = 'C00000001';
        this.account = 'A00000001';
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.HOME_ICON}/>
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
            console.log(e)
        }
    }

    render() {
        return (
            <View style={stylesBase.CONTAINER}>
                <AppHeader title='Home' data={this.props}/>
                <View style={stylesBase.BODY}>
                    <View style={styles.row}>
                        <Text style={styles.hello}>
                            <Username data={this.state.username}/>
                        </Text>
                    </View>
                    <View style={styles.rowBalance}>
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
        color: 'green',
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
    balance: {
        flex: 1,
    },
    transaction: {
        flex: 5,
    },
});
