import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import AppHeader from "../../routes/AppHeader";
import TopUpForm from "../sections/TopUpForm";
import * as stylesBase from "../../config/Base";
import * as config from "../../config/Constant";
import AccountService from "../../HomeScreen/views/AccountService";
import {showMessage} from "react-native-flash-message";

//represent amount needed to restore something to its former level
export default class TopUpContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: '',
            isDisabled: true
        }
        this.username = 'C00000001';
        this.account = 'A00000001';
        this.service = new AccountService(this.username, this.account, config.BASE_URL);
    }

    static navigationOptions = {
        drawerIcon: ({tintColor}) => (
            <Image style={stylesBase.IMAGE_MENU} source={config.TOP_UP_ICON}/>
        ),
    };

    currencyFormatter(amount) {
        const formatter = new Intl.NumberFormat('en-ID');
        return formatter.format(amount);
    }

    render() {
        return (
            <View style={styles.container}>
                <AppHeader title='Top Up' data={this.props}/>
                <View style={styles.body}>
                    <View style={styles.row}>
                        <TopUpForm
                            amount={this.state.amount}
                            onChangeAmount={this.handleChangeAmount}
                            onPressSubmit={this.handleSubmit}
                            valid={this.state.isDisabled}
                        />
                    </View>
                </View>
            </View>
        );
    }

    isValidAmount(Amount){
        if(Amount.replace('.','') > config.MINIMUM_TRX) {
            return true;
        }
        return false;
    }

    handleChangeAmount = (amount) => {
        let inAmount = amount.replace(/[^0-9]/g, '');
        let finalAmount = this.currencyFormatter(inAmount);
        this.setState({ isDisabled: true })
        if(this.isValidAmount(inAmount)){
            this.setState({ isDisabled: false  })
        }
        this.setState({amount: finalAmount});
    };

    handleSubmit = () => {

        this.service.postTransaction({
            transactionType: 'credit',
            amount: this.state.amount.replace('.',''),

        })
            .then(() => {
                showMessage({
                    message: "Top Up Success",
                    description: "Amount added to your balance",
                    type: "success",
                    icon: "success"
                });
                this.props.navigation.navigate('Home')

            })
            .catch(() => {
                showMessage({
                    message: "Top Up Failed",
                    description: "Something Error",
                    type: "danger",
                    icon: "danger"
                });
            });
    };
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    body: {
        alignItems: 'center',
        padding: 10,
    },
    row: {
        borderBottomWidth: 2,
        borderBottomColor: '#131412',
        width: '100%',
        padding: 10,
    },
});
