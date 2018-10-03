/* global describe it expect */
import React from 'react';
import {shallow} from 'enzyme';
import PayeeContainer from './PayeeContainer';
import AccountService from "../../HomeScreen/views/AccountService";

jest.mock('../../HomeScreen/views/AccountService');


describe('PayeeContainer', () => {
    function renderedComponent() {
        return shallow(<PayeeContainer/>);
    }

    describe('render', () => {
        it('should be render Payee Form', () => {
            expect(renderedComponent().find('PayeeForm')).toBeDefined();
        });
    });

    describe('onChange', () => {
        it('should change the state of payeeAccount when there is change input payeeAccount', () => {
            const payeeAccount = 'A00000002';
            const wrapper = shallow(<PayeeContainer/>);
            wrapper.instance().handleChangeAccount(payeeAccount);
            expect(wrapper.state().payeeAccount).toBe(payeeAccount);
            expect(wrapper.state().payeeAccountName).toBe('');
        });

    });

    describe('handleClickCheck', () => {
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
            const wrapper = shallow(<PayeeContainer/>);
            wrapper.instance().handleClickCheck();
            await Promise.resolve();
            expect(mockPostTransaction).toHaveBeenCalled();
        });
    });
});
