/* global expect it describe */

import React from 'react';
import {shallow} from 'enzyme';
import TransferForm from './TransferForm';

describe('TransferForm', () => {
    function transferFormComponent() {
        return shallow(<TransferForm/>);
    }

    describe('render', () => {
        it('should have input account #acoount', () => {
            expect(transferFormComponent().find('#account')).toHaveLength(1);
        });

        it('should have input amount #amount', () => {
            expect(transferFormComponent().find('#amount')).toHaveLength(1);
        });

        it('should have input description #description', () => {
            expect(transferFormComponent().find('#description')).toHaveLength(1);
        });

        it('should have input button confirm #btnConfirm', () => {
            expect(transferFormComponent().find('#btnConfirm')).toHaveLength(1);
        });
    });

    describe('onChange', () => {
        it('should be call onChangeAccount() when user select account', () => {
            const onChangeAccount = jest.fn();
            const rendered = transferFormComponent().setProps({onChangeAccount});
            rendered.find('#account').simulate('changeText');
            expect(onChangeAccount).toHaveBeenCalled();
        });

        it('should be call onChangeAmount() when user input amount', () => {
            const onChangeAmount = jest.fn();
            const rendered = transferFormComponent().setProps({onChangeAmount});
            rendered.find('#amount').simulate('changeText');
            expect(onChangeAmount).toHaveBeenCalled();
        });

        it('should be call onChangeDescription() when user input description', () => {
            const onChangeDescription = jest.fn();
            const rendered = transferFormComponent().setProps({onChangeDescription: onChangeDescription});
            rendered.find('#description').simulate('changeText');
            expect(onChangeDescription).toHaveBeenCalled();
        });
    });

    describe('onSubmit', () => {
        it('should be call onPressSubmit() when submit form', () => {
            const onPressSubmit = jest.fn();
            const rendered = transferFormComponent().setProps({onPressSubmit});
            rendered.find('#btnConfirm').simulate('press');
            expect(onPressSubmit).toHaveBeenCalled();
        });
    });
});
