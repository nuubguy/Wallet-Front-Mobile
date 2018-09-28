import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Header, Left, Icon, Title, Right} from 'native-base';
import Balance from '../sections/Balance';
import TransactionHistoryContainer from '../../TransactionHistoryScreen/TransactionHistoryContainer';
import Username from '../sections/Username';
import AccountService from './AccountService';
import * as config from '../../config/Constant';
import AppHeader from "../../routes/AppHeader";
export default class HomeContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            balance: {
                amount: '',
                currency: ''
            }
        }
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Icon name="home" style={{fontSize: 24, color: tintColor}}/>
        )
    };

    async componentDidMount() {
        try {
            let account = new AccountService('C00000001', 'A00000001', config.BASE_URL);
            let result = await account.getAccount();
            this.setState({
                username: result.data.customer.name,
                balance: result.data.balance
            });

        }
        catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader title='Home' data={this.props}/>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <Text style={styles.hello}>
                            <Username data={this.state.username}/>
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Balance style={styles.balance} data={this.state.balance}/>
                    </View>
                </View>
                <View style={styles.transaction}>
                    <TransactionHistoryContainer/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
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
    balance: {
        flex: 1,
    },
    body: {
        flex: 1,
        alignItems: 'center',
    },
    transaction: {
        flex: 5,
    },
});
