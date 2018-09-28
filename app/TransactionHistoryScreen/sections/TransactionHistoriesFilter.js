import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

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

const TransactionFilter = () => (
    <View>
        <View style={styles.row}>
            <Text style={styles.text}> Transaction Filter</Text>
        </View>
    </View>
);


export default TransactionFilter;
