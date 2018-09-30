import React from 'react';
import {View} from 'react-native';
import {FormLabel, FormInput, Button} from 'react-native-elements'
import * as stylesBase from "../../config/Base";
import PropTypes from 'prop-types';

// represent form for save money to wallet
const TopUpForm = (props) => (
            <View style={{padding: 20}}>
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

export default TopUpForm;
TopUpForm.propTypes = {
    amount : PropTypes.string,
    description : PropTypes.string,
    onChangeAmount: PropTypes.func,
    onChangeDescription: PropTypes.func,
    onPressSubmit: PropTypes.func,
};
