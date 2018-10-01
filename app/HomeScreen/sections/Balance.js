import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import * as styleBase from '../../config/Base';
import * as config from '../../config/Constant';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#333333',
        flexDirection: 'row',
        marginLeft: 10,
        fontWeight: 'bold'
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
    const {amount, currency} = props.data;
    return (
        <View>
            <View style={styles.row}>
                <Image style={styleBase.IMAGE_ICON} source={config.BALANCE_ICON}/>
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
