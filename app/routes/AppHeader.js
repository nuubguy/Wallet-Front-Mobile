import React from 'react';
import {Header} from "react-native-elements";
import {Text, View, StyleSheet} from 'react-native';

const AppHeader = props => {
    return (
        <View>
            <Header
                style={{paddingTop: 90}}
                backgroundColor='#0fb9b1'
                leftComponent={{ icon: 'menu', color: '#fff', onPress : () => props.data.navigation.openDrawer() }}
                centerComponent={{ text: props.title, style: { color: '#fff' } }}
            />
        </View>


    )
}
export default AppHeader;
