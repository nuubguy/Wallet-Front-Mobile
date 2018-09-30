import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from "prop-types";
import Username from "./Username";

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
        // fontSize: 18,
        // color: '#101010',
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
                <Text> Hi, </Text>
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
AccountId.propTypes = {
    accountId: PropTypes.string,
};
