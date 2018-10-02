/* global expect jest it describe */

import React from 'react';
import { shallow } from 'enzyme';
import TransferForm from './TransferForm';

describe('SearchRecipientForm', () => {
  function searchRecipientFormComponent() {
    return shallow(<TransferForm />);
  }

  describe('render', () => {
    it('should have input account #account', () => {
      expect(searchRecipientFormComponent().find('#account')).toBeDefined();
    });

    it('should have input button check #btnCheck', () => {
      expect(searchRecipientFormComponent().find('#btnCheck')).toBeDefined();
    });
  });

  describe('onChange', () => {
    it('should be call onChangeAccount() when user select account', () => {
      const onChangeAccount = jest.fn();
      const rendered = searchRecipientFormComponent().setProps({ onChangeAccount });
      rendered.find('#account').simulate('changeText');
      expect(onChangeAccount).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('should be call onPressCheck() when check button press', () => {
      const onPressCheck = jest.fn();
      const rendered = searchRecipientFormComponent().setProps({ onPressCheck });
      rendered.find('#btnCheck').simulate('press');
      expect(onPressCheck).toHaveBeenCalled();
    });
  });
});
