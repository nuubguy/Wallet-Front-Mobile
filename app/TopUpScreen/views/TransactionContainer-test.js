/* global describe it expect */
import React from 'react';
import {shallow} from 'enzyme';
import TransactionContainer from './TransactionContainer';
import AccountService from "../../HomeScreen/views/AccountService";

jest.mock('../../HomeScreen/views/AccountService');


describe('TransactionContainer', () => {
    function renderedComponent() {
        return shallow(<TransactionContainer/>);
    }

    describe('render', () => {
        it('should be render Transaction Form', () => {
            expect(renderedComponent().find('TransactionForm')).toBeDefined();
        });
    });


    describe('onChangeAmount', () => {
        it('should change the state of amount when there is change in input amount', () => {
            const amount = '10000';
            const wrapper = shallow(<TransactionContainer/>);
            wrapper.instance().handleChangeAmount(amount);
            expect(wrapper.state().amount).toBe(amount);
        });

        it('should change the state of description when there is change in input description', () => {
            const description = 'Buy Pizza';
            const wrapper = shallow(<TransactionContainer/>);
            wrapper.instance().handleChangeDescription(description);
            expect(wrapper.state().description).toBe(description);
        });
    });

    describe('handleSubmit', () => {
        it('should be able to post to wallet when press button confirm', async () => {

            let mockPostTransaction = jest.fn(() => {
                return Promise.resolve({
                    data: ""
                })
            });
            AccountService.mockImplementation(() => {
                return {
                    postTransaction: mockPostTransaction
                }
            });
            const wrapper = shallow(<TransactionContainer/>);
            wrapper.instance().handleSubmit();
            await Promise.resolve();
            expect(mockPostTransaction).toHaveBeenCalled();
        });
    });
});
