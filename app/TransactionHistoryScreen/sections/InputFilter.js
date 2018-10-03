import React from 'react';
import {
  Text, View,
} from 'react-native';
import { Button } from 'react-native-elements';
import Dialog from 'react-native-dialog';

export default class InputFilter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Button
          id="Filter"
          title="Filter"
          onPress={() => { this.props.showDialog(); }}
          backgroundColor="#F4511E"
        />
        <Dialog.Container visible={this.props.dialogVisible}>
          <Dialog.Title>Find Transaction</Dialog.Title>
          <Dialog.Input
            placeholder="Amount"
            onChangeText={(e) => { this.props.inputOnChange(e); }}
          />
          <Dialog.Input
            placeholder="Description"
            onChangeText={(e) => { this.props.descriptionOnChange(e); }}
          />
          <Dialog.Button id="cancel" label="Cancel" onPress={this.props.handleCancel} />
          <Dialog.Button id="submit" label="Submit" onPress={this.props.handleSubmit} />
        </Dialog.Container>
      </View>

    );
  }
}
