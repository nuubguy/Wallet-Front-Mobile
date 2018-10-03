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
    });
});
