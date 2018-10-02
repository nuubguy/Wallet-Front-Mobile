/* global describe it expect */
import React from 'react';
import { shallow } from 'enzyme';
import LoginLoading from './LoginLoading';

describe('LoginLoading', () => {
    function renderedComponent() {
        return shallow(<LoginLoading />);
    }

    describe('render', () => {
        it('should be render ActivityIndicator', () => {
            expect(renderedComponent().find('ActivityIndicator')).toBeDefined();
        });
        it('should be render StatusBar', () => {
            expect(renderedComponent().find('StatusBar')).toBeDefined();
        });
    });
});
