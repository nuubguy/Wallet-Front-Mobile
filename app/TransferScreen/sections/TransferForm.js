import React from 'react';
import {View, Picker} from 'react-native';
import {FormInput, Button} from 'react-native-elements'
import * as stylesBase from "../../config/Base";
import PropTypes from 'prop-types';

// represent form for save money to wallet
const TransactionForm = (props) => (
    <View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="accountName"
                value={props.recipientAccountName}
                placeholder={'Recipient Name'}
                editable={false}
            />
        </View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="amount"
                value={props.amount}
                keyboardType='numeric'
                placeholder={'Amount (Min. 15.001)'}
                onChangeText={props.onChangeAmount}
            />
        </View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="description"
                value={props.description}
                placeholder={'Description (Max. 15 characters)'}
                onChangeText={props.onChangeDescription}
            />
        </View>
        <View style={stylesBase.ROW}>
            <Button backgroundColor={'#33ad41'}
                    id="btnConfirm"
                    title='Confirm'
                    onPress={props.onPressSubmit}
                    disabled={props.valid}
            />
        </View>
    </View>
);

export default TransactionForm;
TransactionForm.propTypes = {
    amount: PropTypes.string,
    description: PropTypes.string,
    onChangeAmount: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onPressSubmit: PropTypes.func,
    valid: PropTypes.bool
};
