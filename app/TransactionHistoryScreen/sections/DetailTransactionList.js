import React from 'react';
import {
    View, StyleSheet, ScrollView,
} from 'react-native';
import {
    Body, Left, ListItem, Right, Text,
} from 'native-base';
import moment from 'moment';

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

function currencyFormatter(amount) {
    const formatter = new Intl.NumberFormat('id-ID', {
        minimumFractionDigits: 2,
    });
    return formatter.format(amount);
}

function dateFormatter(date) {
    return moment(date).format('MMM DD YYYY, HH:mm A');
}

export default class DetailTransactionList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ScrollView style={styles.viewTable}>
                {this.props.currentTransactions.map(transaction => (

                    <ListItem avatar key={transaction.transactionId}>
                        <Left />
                        <Body style={{ borderColor: '#000', borderBottomWidth: 1 }}>
                        <Text style={{ paddingBottom: 10 }}>
                            {`${currencyFormatter(transaction.amount)} `}
                            {' '}
                        </Text>

                        <Text>{dateFormatter(transaction.dateTime)}</Text>
                        </Body>
                        <Right style={{ borderColor: '#000', borderBottomWidth: 1 }}>
                            <Text
                                note
                            >
                                {' '}
                                {transaction.transactionId}

                            </Text>
                            <Text note>
                                {' '}
                                {`${transaction.transactionType.toLocaleUpperCase()}`}
                                {' '}
                            </Text>
                            <Text note>
                                {' '}
                                {`${transaction.description}`}
                                {' '}
                            </Text>
                        </Right>
                    </ListItem>
                ))}
            </ScrollView>
        );
    }
}
