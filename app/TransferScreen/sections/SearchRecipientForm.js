import React from 'react';
import { View } from 'react-native';
import { FormInput, Button } from 'react-native-elements';
import PropTypes from 'prop-types';
import * as stylesBase from '../../config/Base';

// represent form for search account
const SearchRecipientForm = props => (
  <View>
    <View style={stylesBase.ROW}>
      <FormInput
        id="account"
        value={props.account}
        placeholder="Payee account ID"
        onChangeText={props.onChangeAccount}
      />
    </View>
    <View style={stylesBase.ROW}>
      <Button
        id="btnCheck"
        title="Check"
        onPress={props.onPressCheck}
        backgroundColor="#33ad41"
      />
    </View>
  </View>
);

export default SearchRecipientForm;
SearchRecipientForm.propTypes = {
  account: PropTypes.string,
  onChangeAccount: PropTypes.func,
  onPressCheck: PropTypes.func,
  valid: PropTypes.bool,
};
