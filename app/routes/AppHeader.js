import React from 'react';
import {Header} from "react-native-elements";
import {View} from 'react-native';

const AppHeader = props => {
    return (
        <View>
            <Header
<<<<<<< HEAD
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
=======
                backgroundColor='#0fb9b1'
                outerContainerStyles={{height: 90}}
                leftComponent={{ icon: 'menu', color: '#fff', onPress : () => props.data.navigation.openDrawer() }}
                centerComponent={{ text: props.title, style: { color: '#fff', fontSize: 18, fontWeight:'bold' } }}
>>>>>>> master
            />
        </View>


    )
}
export default AppHeader;
