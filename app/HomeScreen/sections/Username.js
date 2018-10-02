import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {HOME_SCREEN_STYLE} from '../../config/Base';

const Username = ({data}) => (
    <View>
        <View style={HOME_SCREEN_STYLE.row}>
            <Text style={HOME_SCREEN_STYLE.text}> Hello, </Text>
            {' '}
            {' '}
            <Text style={HOME_SCREEN_STYLE.text} id="username">
                {' '}
                {data}
                {' '}
                {' '}
                {' '}
                {' '}
            </Text>

        </View>
    </View>
);
export default Username;
Username.propTypes = {
    data: PropTypes.string,
};
