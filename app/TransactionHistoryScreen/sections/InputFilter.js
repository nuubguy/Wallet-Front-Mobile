import React from 'react';
import {
  Text, View, CheckBox,
} from 'react-native';
import {
  Button,
} from 'native-base';
import Dialog from 'react-native-dialog';

export default class InputFilter extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <View>
        <Button full info onPress={()=>{this.props.showDialog()}}>
          <Text>Filter</Text>
        </Button>
        <Dialog.Container visible={this.props.dialogVisible}>
          <Dialog.Title>Find Transaction</Dialog.Title>
          <Dialog.Input
            placeholder="Enter Description"
            onChangeText={(e) => { this.props.descriptionOnChange(e); }}
          />
          <Dialog.Button label="Cancel" onPress={this.props.handleCancel} />
          <Dialog.Button label="Submit" onPress={this.props.handleSubmit} />
        </Dialog.Container>
      </View>

    );
  }
}
