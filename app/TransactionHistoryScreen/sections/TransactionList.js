import React from 'react';
import {
  StyleSheet, ScrollView,
} from 'react-native';
import {
  Body, Left, ListItem, Right, Text,
} from 'native-base';
import moment from 'moment';

const styles = StyleSheet.create({
  rowSpace: {
    paddingBottom: 5,
  },
  borderBlack: {
    borderColor: '#000',
    borderBottomWidth: 1,
  },
});

function _currencyFormatter(amount) {
  const formatter = new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 2,
  });
  return formatter.format(amount);
}

function _dateFormatter(date) {
  return moment(date).format('MMM DD YYYY, h:mm A');
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
            <Body style={styles.borderBlack}>
              <Text style={styles.rowSpace}>
                {`${_currencyFormatter(transaction.amount)} `}
                {' '}
              </Text>
              <Text note>
                {transaction.transactionId}
                {' '}
              </Text>
              <Text note>
                {transaction.description || '-'}
                {' '}
              </Text>
            </Body>
            <Right style={styles.borderBlack}>
              <Text style={styles.rowSpace}>{_dateFormatter(transaction.dateTime)}</Text>
              <Text note>
                {`${transaction.transactionType.toLocaleUpperCase()}`}
                {' '}
              </Text>
            </Right>
          </ListItem>
        ))}
      </ScrollView>
    );
  }
}
