import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        color: '#101010',
        flexDirection: 'row',
    },
    balance: {
        fontSize: 18,
        color: '#101010',
    },
    row: {
        flexDirection: 'row',

    },
    right: {
        flexDirection: 'row',
    },
});

const Username = ({data}) => {
    return (
        <View>
            <View style={styles.row}>
                <Icon name="md-man"/>
                {' '}
                <Text style={styles.text}> Hi, </Text>
                <View style={styles.right}>
                    <Text style={styles.text} id="username">
                        {' '}
                        {data}
                        {' '}
                    </Text>
                </View>
            </View>
        </View>
    );
};


export default Username;
