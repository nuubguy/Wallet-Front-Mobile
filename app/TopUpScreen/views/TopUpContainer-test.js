/* global describe it expect */
import React from 'react';
import {shallow} from 'enzyme';
import TransactionContainer from './TransactionContainer';

describe('TopUpContainer', () => {
    function renderedComponent() {
        return shallow(<TransactionContainer/>);
    }

    describe('render', () => {
        it('should be render Application Header', () => {
            expect(renderedComponent().find('AppHeader')).toBeDefined();
        });
        it('should be render Transaction Container', () => {
            expect(renderedComponent().find('TransactionContainer')).toBeDefined();
        });
    });
});
