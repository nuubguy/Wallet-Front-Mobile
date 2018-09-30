import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Balance from '../sections/Balance';
import Username from '../sections/Username';
import AccountService from './AccountService';
import * as config from '../../config/Constant';
import * as stylesBase from '../../config/Base';
import AppHeader from "../../routes/AppHeader";
import TransactionHistoriesList from "../../TransactionHistoryScreen/sections/TransactionHistoriesList";


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
            <View>
                <Image style={stylesBase.IMAGE_MENU} source={config.HOME_ICON}/>
            </View>
        ),
    };

    async componentDidMount() {
        try {
            let account = new AccountService(this.username, this.account, config.BASE_URL);
            let result = await account.getAccount();
            let trxResponse = await account.getTransactionList();
            this.setState({
                username: result.data.customer.name,
                balance: result.data.balance,
                transactions: trxResponse.data
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
                <View>
                    <View style={styles.row}>
                        <Text style={styles.hello}>
                            <Username data={this.state.username}/>
                        </Text>
                    </View>
                    <View style={styles.box}>
                        <Balance style={styles.balance} data={this.state.balance}/>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <TransactionHistoriesList data={this.state.transactions} navigate={this.props.navigation}/>
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
        padding: 20,
    },
});
