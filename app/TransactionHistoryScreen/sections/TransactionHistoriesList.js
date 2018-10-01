// trxhist list
import {
    Body, Container, Content, Icon, Left, List, ListItem, Right, Text,
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import React from 'react';

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


const TransactionHistoriesList = props => (
    <Container>
        <Content>
            <View style={styles.row}>
                <Text style={{color: 'white'}}>Transaction Histories</Text>
                <Right>
                    {/* <Button transparent> */}
                    <Icon
                        name="ios-arrow-forward"
                        onPress={() => {
                        }}
                        style={{color: 'white'}}
                    />
                    {/* </Button> */}
                </Right>
            </View>

            <List id="transactionsId">
                {
                    props.data.map(transaction => (
                        <ListItem avatar key={transaction.transactionId}>
                            <Left/>
                            <Body>
                            <Text>{transaction.transactionId}</Text>
                            <Text>{currencyFormatter(transaction.amount)+' '+transaction.currency}</Text>
                            </Body>
                            <Right>
                                <Text
                                    note
                                >
                                    {dateFormatter(transaction.dateTime)}
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
export default TransactionHistoriesList;
