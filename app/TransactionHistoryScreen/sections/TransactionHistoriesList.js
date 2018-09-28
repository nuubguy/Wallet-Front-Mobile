// trxhist list
import {
  Body, Container, Content, Icon, Left, List, ListItem, Right, Text,
} from 'native-base';
import { StyleSheet, View } from 'react-native';
import React from 'react';


const TransactionHistoriesList = props => (
  <Container>
    <Content>
      <View style={styles.row}>
        <Text>Transaction Histories</Text>
        <Right>
          {/* <Button transparent> */}
          <Icon
            name="ios-arrow-forward"
            onPress={() => {
            }}
          />
          {/* </Button> */}
        </Right>
      </View>
      <List id="transactionsId">
        {
                    props.data.map(transaction => (
                      <ListItem avatar key={transaction.transactionId}>
                        <Left />
                        <Body>
                          <Text>{transaction.transactionId}</Text>

                          <Text>{transaction.amount}</Text>
                        </Body>
                        <Right>
                          <Text
                            note
                          >
                            {`${transaction.dateTime.substring(0, 10)}${'  '}${transaction.dateTime.substring(12, 16)}`}
                          </Text>
                          <Text note>{transaction.transactionType}</Text>
                        </Right>
                      </ListItem>
                    ))
                }
      </List>
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
    padding: 10,
    paddingLeft: 20,
    flexDirection: 'row',
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
export default TransactionHistoriesList;
