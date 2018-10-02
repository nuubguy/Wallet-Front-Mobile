import React from 'react';
import {Header} from 'react-native-elements';
import {View} from 'react-native';

const AppHeader = props => (
    <View>
        <Header
            backgroundColor="#0fb9b1"
            outerContainerStyles={{height: 90}}
            leftComponent={{icon: 'menu', color: '#fff', onPress: () => props.data.navigation.openDrawer()}}
            centerComponent={{text: props.title, style: {color: '#fff', fontSize: 18, fontWeight: 'bold'}}}
        />
    </View>


);
export default AppHeader;
