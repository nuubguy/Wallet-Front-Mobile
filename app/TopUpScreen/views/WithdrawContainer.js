import React, {Component} from 'react';
import {View, Image} from 'react-native';
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";

import TransactionContainer from "./TransactionContainer";
import AppHeader from "../../routes/AppHeader";

//represent involves removing funds from a bank account, savings plan, pension or trust.
export default class WithdrawContainer extends Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.WITHDRAW_ICON}/>
        ),
    };

    render() {
        return (
            <View>
                <AppHeader title='Withdraw' data={this.props}/>
                <TransactionContainer
                    route={this.props.navigation.state.key}
                    type={config.DEBIT}
                    navigation={this.props.navigation}/>
            </View>
        );
    }
}

