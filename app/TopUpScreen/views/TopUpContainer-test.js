/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';
import someAxios from 'axios';
import TopUpContainer from './TopUpContainer';
import {MockInstance as mockGetTransactionList, MockInstance as AccountService} from "jest";

jest.mock('axios');


describe('TopUpContainer', () => {
    function renderedComponent() {
        return shallow(<TopUpContainer />);
    }

    describe('render', () => {
        it('should be render Application Header', () => {
            expect(renderedComponent().find('AppHeader')).toBeDefined();
        });
        it('should be render Top up Form', () => {
            expect(renderedComponent().find('TopUpForm')).toBeDefined();
        });
    });


    describe('onChangeAmount', () => {
        it('should change the state of amount when there is change in input amount', () => {
            const amount = '10000';
            const wrapper = shallow(<TopUpContainer />);
            wrapper.instance().handleChangeAmount(amount);
            expect(wrapper.state().amount).toBe(amount);
        });
    });

    describe('handleSubmit', () => {
        it('should be able to post to wallet when press button confirm', async () => {
            someAxios.post.mockImplementation(() => Promise.resolve());
            const wrapper = shallow(<TopUpContainer />);
            wrapper.instance().handleSubmit({
                preventDefault: () => {
                },
            });
            await Promise.resolve();
            expect(someAxios.post).toHaveBeenCalled();
        });
    });
});
