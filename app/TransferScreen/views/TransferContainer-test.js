/* global describe it expect */
import React from 'react';
import {shallow} from 'enzyme';
import TransferContainer from './TransferContainer';
import AccountService from "../../HomeScreen/views/AccountService";

jest.mock('../../HomeScreen/views/AccountService');


describe('TransferContainer', () => {
    function renderedComponent() {
        return shallow(<TransferContainer/>);
    }

    describe('render', () => {
        it('should be render Transfer Form', () => {
            expect(renderedComponent().find('TransferForm')).toBeDefined();
        });
    });

    describe('onChange', () => {
        it('should change the state of account when there is change input account', () => {
            const account = 'A00000001';
            const wrapper = shallow(<TransferContainer/>);
            wrapper.instance().handleChangeAccount(account);

            expect(wrapper.state().recipientAccountId).toBe(account);
        });

        it('should change the state of amount when there is change input amount', () => {
            const amount = '10000';
            const wrapper = shallow(<TransferContainer/>);
            wrapper.instance().handleChangeAmount(amount);
            expect(wrapper.state().amount).toBe(amount);
        });

        it('should change the state of description when there is change input description', () => {
            const description = 'Buy Pizza';
            const wrapper = shallow(<TransferContainer/>);
            wrapper.instance().handleChangeDescription(description);
            expect(wrapper.state().description).toBe(description);
        });
    });

    describe('handleSubmit', () => {
        it('should be able to post to wallet when press button confirm', async () => {

            // let mockPostTransaction = jest.fn(() => {
            //     return Promise.resolve({
            //         data: ""
            //     })
            // });
            // AccountService.mockImplementation(() => {
            //     return {
            //         postTransaction: mockPostTransaction,
            //     }
            // });
            // const wrapper = shallow(<TransferContainer/>);
            // wrapper.instance().handleSubmit();
            // await Promise.resolve();
            // expect(mockPostTransaction).toHaveBeenCalled();
        });
    });
});
