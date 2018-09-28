import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#101010',
    flexDirection: 'row',
  },
  balance: {
    fontSize: 18,
    color: '#101010',
  },
  row: {
    flexDirection: 'row',

  },
  right: {
    flexDirection: 'row',
  },
});

function currencyFormatter(balance) {
  const formatter = new Intl.NumberFormat('en-ID', {
    minimumFractionDigits: 2,
  });
  return formatter.format(balance);
}

const Balance = (props) => {
  const { amount, currency } = props.data;
  return (
    <View>
      <View style={styles.row}>
        <Icon name="ios-card" />
        {' '}
        <Text style={styles.balance}> Total Balance : </Text>
        <View style={styles.row}>
          <View style={styles.right}>
            <Text style={styles.text} id="endBalance">
              {currencyFormatter(amount)}
              {' '}
            </Text>
            <Text style={styles.text} id="currency">
              {' '}
              {currency}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};


export default Balance;
