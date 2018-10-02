import React from 'react';
import {
    Text, View, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import * as styleBase from '../../config/Base';
import * as config from '../../config/Constant';
import {HOME_SCREEN_STYLE} from '../../config/Base';

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        color: '#333333',
        flexDirection: 'row',
        marginLeft: 10,
        fontWeight: 'bold',
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
        <View style={{alignItems: 'center', alignContent:'center'}}>
            <View style={HOME_SCREEN_STYLE.row}>
                <Image style={styleBase.IMAGE_ICON} source={config.BALANCE_ICON}/>
                <View style={HOME_SCREEN_STYLE.row}>
                    <View style={HOME_SCREEN_STYLE.right}>
                        <Text style={styles.text} id="endBalance">
                            {currencyFormatter(amount)}
                        </Text>
                        <Text style={styles.text} id="currency">
                            {currency}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};


export default Balance;
Balance.propTypes = {
    currency: PropTypes.string,
    amount: PropTypes.string,
};
