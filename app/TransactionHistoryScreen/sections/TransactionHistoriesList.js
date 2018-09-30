import {
    Body, Container, Content, Icon, List, ListItem, Right, Text, Left, Thumbnail, Image
} from 'native-base';
import {StyleSheet, View} from 'react-native';
import React from 'react';
import * as config from '../../config/Constant';


const getImage = (type) =>{
    if(type === 'credit'){
        return config.IMAGE_CREDIT;
    }
    return config.IMAGE_DEBIT;
}

const TransactionHistoriesList = props => (
    <Container>
        <Content>
            <View style={styles.row}>
                <Text style={{color: 'white'}}>Transaction Histories</Text>
                <Right>
                    <Icon
                        name="ios-arrow-forward"
                        onPress={() => {
                        }}
                        style={{color: 'white'}}
                    />
                </Right>
            </View>

            <List id="transactionsId">
                {
                    props.data.map(transaction => (
                        <ListItem avatar key={transaction.transactionId}>
                            <Left>
                                <Thumbnail
                                    source={getImage(transaction.transactionType)}/>
                            </Left>
                            <Body style={{paddingBottom: 22}}>
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
