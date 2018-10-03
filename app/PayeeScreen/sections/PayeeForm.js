import React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as stylesBase from '../../config/Base';

// represent form for search account
const PayeeForm = props => (
    <View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="account"
                value={props.account}
                placeholder="Account ID"
                onChangeText={props.onChangeAccount}
            />
        </View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="accountName"
                value={props.accountName}
                placeholder="Account Name"
                editable={false}
            />
        </View>
        <View style={stylesBase.ROW}>
            <Button
                id="btnCheck"
                title="Add Payee"
                onPress={props.onPressCheck}
                backgroundColor="#33ad41"
            />
        </View>
    </View>
);

export default PayeeForm;
PayeeForm.propTypes = {
    account: PropTypes.string,
    onChangeAccount: PropTypes.func,
    onPressCheck: PropTypes.func,
};
