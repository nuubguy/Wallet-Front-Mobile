import React from 'react';
import {Header} from "react-native-elements";
import {View} from 'react-native';

const AppHeader = props => {
    return (
        <View>
            <Header
                font
                backgroundColor='#0fb9b1'
                leftComponent={{icon: 'menu', color: '#fff', onPress: () => props.data.navigation.openDrawer()}}
                centerComponent={{
                    text: props.title,
                    style: {
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize : 16,
                    }
                }}
            />
        </View>


    )
}
export default AppHeader;
