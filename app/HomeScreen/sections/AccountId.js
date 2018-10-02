import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'native-base';
import PropTypes from 'prop-types';
import {HOME_SCREEN_STYLE} from '../../config/Base';

const AccountId = ({data}) => {
    const {accountId} = data;
    return (
        <View>
            <View style={styles.HOME_SCREEN_STYLE}>
                <Icon name="md-contacts"/>
                {' '}
                <Text> Hi, </Text>
                <View style={styles.HOME_SCREEN_STYLE}>
                    <Text style={HOME_SCREEN_STYLE.text} id="accountId">
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
