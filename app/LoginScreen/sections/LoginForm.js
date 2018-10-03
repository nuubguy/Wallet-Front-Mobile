import React from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar,
} from 'react-native';

// represent form to authenticate user
const LoginForm = props => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <TextInput
      id="email"
      style={styles.input}
      onSubmitEditing={() => this.passwordInput.focus()}
      keyboardType="email-address"
      returnKeyType="next"
      placeholder="Enter Username"
      placeholderTextColor="#fff"
      onChangeText={props.onChangeEmail}
      value={props.email}
    />

    <TextInput
      id="password"
      style={styles.input}
      returnKeyType="go"
      ref={input => this.passwordInput = input}
      placeholder="Enter Password"
      placeholderTextColor="#fff"
      onChangeText={props.onChangePassword}
      value={props.password}
      secureTextEntry
    />
    <TouchableOpacity style={styles.buttonContainer} id="btnLogin" onPress={props.onPressSubmit}>
      <Text style={styles.buttonText}>LOGIN</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    backgroundColor: '#0d4745',
    marginBottom: 10,
    padding: 10,
    color: '#fff',
    borderRadius: 10,
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  loginButton: {
    backgroundColor: '#2980b6',
    color: '#fff',
  },

});

export default LoginForm;

LoginForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onChangeEmail: PropTypes.func,
  onChangePassword: PropTypes.func,
};
