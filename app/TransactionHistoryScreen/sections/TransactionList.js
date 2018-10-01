import React from 'react';
import {
  View, StyleSheet, ScrollView,
} from 'react-native';
import {
  Body, Left, ListItem, Right, Text,
} from 'native-base';
import AppHeader from '../../routes/AppHeader';
import InputFilter from './InputFilter';
import AccountService from '../../HomeScreen/views/AccountService';
import * as config from '../../config/Constant';

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
  const aDate = Date.parse(date);

  let newDate = new Date(aDate).toDateString();
  newDate = newDate.split(' ').slice(1).join(' ');

  let newTime = new Date(aDate).toLocaleTimeString();
  newTime = newTime.split(':');

  const timeZone = newTime[2].split(' ');

  return `${newDate}, ${newTime[0]}:${newTime[1]} ${timeZone[1]}`;
}

export default class TransactionList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.viewTable}>
        {this.props.currentTransactions.map(transaction => (
          <ListItem avatar key={transaction.transactionId}>
            <Left />
            <Body>
              <Text>{transaction.transactionId}</Text>
              <Text>{`${currencyFormatter(transaction.amount)} ${transaction.currency}` }</Text>
            </Body>
            <Right>
              <Text
                note
              >
                {dateFormatter(transaction.dateTime)}
              </Text>
              <Text note>{`${transaction.transactionType} ${transaction.description}`}</Text>
            </Right>
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}
