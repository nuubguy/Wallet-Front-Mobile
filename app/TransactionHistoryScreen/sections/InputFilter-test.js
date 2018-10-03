import { shallow } from 'enzyme/build';
import React from 'react';
import InputFilter from './InputFilter';

describe('Transaction Input', () => {
  describe('render', () => {
    function setup() {
      const props = {
        dialogVisible: false,
        amount: '',
        description: '',
        currentTransactions: [],
        sort: 0,
        isTrue: true,
      };
      return shallow(<InputFilter />).setProps(props);
    }

    it('should call showDialog when the input filter click ', () => {
      const callbackFn = jest.fn();
      const renderedComponent = setup().setProps({ showDialog: callbackFn });

      renderedComponent.find('#Filter').simulate('press', { target: {} });
      expect(callbackFn).toHaveBeenCalled();
    });

    it('should call inputOnChange when the amount is changed', () => {
      const callbackFn = jest.fn();
      const callbackFnDialog = jest.fn();
      const renderedComponent = setup().setProps({ showDialog: callbackFnDialog, inputOnChange: callbackFn, isTrue: true });

      renderedComponent.find('#amount').simulate('ChangeText', { target: {} });
      expect(callbackFn).toHaveBeenCalledTimes(1);
    });

      it('should call descriptionOnChange when the description is changed', () => {
          const callbackFn = jest.fn();
          const renderedComponent = setup().setProps({ descriptionOnChange: callbackFn });

          renderedComponent.find('#decription').simulate('ChangeText', { target: {} });
          expect(callbackFn).toHaveBeenCalledTimes(1);
      });

      it('should call handleCancel when the cancel button clicked', () => {
          const callbackFn = jest.fn();
          const renderedComponent = setup().setProps({ handleCancel: callbackFn });

          renderedComponent.find('#cancel').simulate('press');
          expect(callbackFn).toHaveBeenCalledTimes(1);
      });

      it('should call handleSubmit when the submit button clicked2', () => {
          const callbackFn = jest.fn();
          const renderedComponent = setup().setProps({ handleSubmit: callbackFn });

          renderedComponent.find('#submit').simulate('press');
          expect(callbackFn).toHaveBeenCalledTimes(1);
      });
  });
});
