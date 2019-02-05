import React, {Component} from 'react';
import {View, Image} from 'react-native';
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";

import TransactionContainer from "./TransactionContainer";
import AppHeader from "../../routes/AppHeader";

//represent an amount added to something in order to raise it to or maintain it at a desired level
export default class TopUpContainer extends Component {

    constructor(props) {
       super(props)
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.TOP_UP_ICON}/>
        ),
    };

    render() {
        return (
            <View>
                <AppHeader title='Top Up' data={this.props}/>
               <TransactionContainer
                   route={this.props.navigation.state.key}
                   type={config.CREDIT}
                   navigation={this.props.navigation}/>
            </View>
        );
    }


}

