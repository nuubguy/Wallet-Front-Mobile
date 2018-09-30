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
                id="account"
                value={props.account}
                placeholder={'Recipient Account'}
                onChangeText={props.onChangeAccount}/>

        </View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="amount"
                value={props.amount}
                keyboardType='numeric'
                placeholder={'Amount of Money'}
                onChangeText={props.onChangeAmount}/>
        </View>
        <View style={stylesBase.ROW}>
            <FormInput
                id="description"
                value={props.description}
                placeholder={'Description (optional)'}
                onChangeText={props.onChangeDescription}/>
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
    account: PropTypes.string,
    amount: PropTypes.string,
    description: PropTypes.string,
    onChangeAccount: PropTypes.func,
    onChangeAmount: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onPressSubmit: PropTypes.func,
};
