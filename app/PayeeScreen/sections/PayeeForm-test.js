/* global expect jest it describe */

import React from 'react';
import { shallow } from 'enzyme';
import PayeeForm from "./PayeeForm";

describe('PayeeForm', () => {
    function payeeFormComponent() {

        return shallow(<PayeeForm/>);
    }

    describe('render', () => {
        it('should have input account #account', () => {
            expect(payeeFormComponent().find('#account')).toBeDefined();
        });

        it('should have input accountName #accountName', () => {
            expect(payeeFormComponent().find('#accountName')).toBeDefined();
        });

        it('should have input button check #btnCheck', () => {
            expect(payeeFormComponent().find('#btnCheck')).toBeDefined();
        });

        it('should have input button check #btnSubmit', () => {
            expect(payeeFormComponent().find('#btnSubmit')).toBeDefined();
        });
    });

    describe('onChange', () => {
        it('should be call onChangeAccount() when user select account', () => {
            const onChangeAccount = jest.fn();
            const rendered = payeeFormComponent().setProps({ onChangeAccount });
            rendered.find('#account').simulate('changeText');
            expect(onChangeAccount).toHaveBeenCalled();
        });
    });

    describe('onSubmit', () => {
        it('should be call onPressCheck() when check button press', () => {
            const onPressCheck = jest.fn();
            const rendered = payeeFormComponent().setProps({ onPressCheck });
            rendered.find('#btnCheck').simulate('press');
            expect(onPressCheck).toHaveBeenCalled();
        });

        it('should be call onPressSubmit() when check button press', () => {
            const onPressSubmit = jest.fn();
            const rendered = payeeFormComponent().setProps({ onPressSubmit: onPressSubmit });
            rendered.find('#btnSubmit').simulate('press');
            expect(onPressSubmit).toHaveBeenCalled();
        });
    });
});
