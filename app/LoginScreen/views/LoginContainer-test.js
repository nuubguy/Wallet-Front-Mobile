/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';
import someAxios from 'axios';
import LoginContainer from './LoginContainer';

jest.mock('axios');


describe('LoginContainer', () => {
    function renderedComponent() {
        return shallow(<LoginContainer />);
    }

    describe('render', () => {
        it('should be render Image Logo', () => {
            expect(renderedComponent().find('Image')).toBeDefined();
        });
        it('should be render Login Form', () => {
            expect(renderedComponent().find('LoginForm')).toBeDefined();
        });
    });


    describe('onChange', () => {
        it('should  be able change the state of email when user input email', () => {
            const email = 'zoombank@btpn.com';
            const wrapper = shallow(<LoginContainer />);
            wrapper.instance().handleChangeEmail(email);
            expect(wrapper.state().email).toBe(email);
        });
        it('should  be able change the state of password when user input password', () => {
            const password = 'z00mBa321';
            const wrapper = shallow(<LoginContainer />);
            wrapper.instance().handleChangePassword(password);
            expect(wrapper.state().password).toBe(password);
        });
    });

    describe('handleSubmit', () => {
        it('should be able to login application when press button ', async () => {
            someAxios.post.mockImplementation(() => Promise.resolve());
            const wrapper = shallow(<LoginContainer />);
            wrapper.instance().handleSubmit();
            await Promise.resolve();
            expect(someAxios.post).toHaveBeenCalled();
        });
    });
});
