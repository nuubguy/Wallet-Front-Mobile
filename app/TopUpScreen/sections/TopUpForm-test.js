/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import TopUpForm from './TopUpForm';

describe('TopUpForm', () => {
    function topUpFormComponent() {
        return shallow(<TopUpForm/>);
    }

    describe('render', () => {

        it('should have input amount #amount', () => {
            expect(topUpFormComponent().find('#amount')).toHaveLength(1);
        });

        it('should have input description #description', () => {
            expect(topUpFormComponent().find('#description')).toHaveLength(1);
        });

        it('should have input button confirm #btnConfirm', () => {
            expect(topUpFormComponent().find('#btnConfirm')).toHaveLength(1);
        });
    });

    describe('onChange', () => {
        it('should be call onChangeAmount() when user input amount', () => {
            const onChangeAmount = jest.fn();
            const rendered = topUpFormComponent().setProps({ onChangeAmount });
            rendered.find('#amount').simulate('changeText');
            expect(onChangeAmount).toHaveBeenCalled();
        });

        it('should be call onChangeDescription() when user input description', () => {
            const onChangeDescription = jest.fn();
            const rendered = topUpFormComponent().setProps({ onChangeDescription: onChangeDescription });
            rendered.find('#description').simulate('changeText');
            expect(onChangeDescription).toHaveBeenCalled();
        });
    });

    describe('onSubmit', () => {
        it('should be call onPressSubmit() when submit form', () => {
            const onPressSubmit = jest.fn();
            const rendered = topUpFormComponent().setProps({ onPressSubmit });
            rendered.find('#btnConfirm').simulate('press');
            expect(onPressSubmit).toHaveBeenCalled();
        });
    });
});
