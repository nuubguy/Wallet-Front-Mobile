import React from 'react';
import { View, Picker } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as stylesBase from '../../config/Base';

// represent form for save money to wallet
const TransactionForm = props => (
  <View>
    <View style={stylesBase.ROW}>
      <FormInput
        id="accountName"
        value={props.recipientAccountName}
        placeholder="Payee Name"
        editable={false}
      />
    </View>
    <View style={stylesBase.ROW}>
      <FormInput
        id="amount"
        value={props.amount}
        keyboardType="numeric"
        placeholder="Amount (Min. 15.000,00)"
        onChangeText={props.onChangeAmount}
        editable={props.isEditable}
      />
    </View>
    <View style={stylesBase.ROW}>
      <FormInput
        id="description"
        value={props.description}
        placeholder="Description (Max. 15 characters)"
        onChangeText={props.onChangeDescription}
      />
    </View>
    <View style={stylesBase.ROW}>
      <Button
        backgroundColor="#F4511E"
        id="btnConfirm"
        title="Transfer"
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
  valid: PropTypes.bool,
};
