// trxhist list
import {
    Body, Container, Content, Icon, Left, List, ListItem, Right, Text,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import TransactionList from "./TransactionList";



const TransactionHeader = props => (
    <Container>
        <Content>
            <View style={styles.row}>
                <Text style={{color: 'white', fontSize: 18}}>Recent Transactions</Text>
                <Right>
                    <Icon
                        name="ios-arrow-forward"
                        onPress={() => {
                            props.navigate.navigate('Transaction History', { transactions: props.data });
                        }}
                        style={{color: 'white'}}
                    />
                </Right>
            </View>

        <TransactionList currentTransactions={props.data}/>
        </Content>
    </Container>
);
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
        padding: 15,
        paddingLeft: 20,
        flexDirection: 'row',
        backgroundColor: '#0fb9b1',
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
export default TransactionHeader;
