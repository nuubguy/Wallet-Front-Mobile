import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

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
    row: {
        flexDirection: 'row',

    },
    right: {
        flexDirection: 'row',
    },
});

const AccountId = ({data}) => {
    const {accountId} = data;
    return (
        <View>
            <View style={styles.row}>
                <Icon name="md-contacts"/>
                {' '}
                <Text style={styles.balance}> Hi, </Text>
                <View style={styles.right}>
                    <Text style={styles.text} id="accountId">
                        {' '}
                        {accountId}
                        {' '}
                    </Text>
                </View>
            </View>
        </View>
    );
};


export default AccountId;
