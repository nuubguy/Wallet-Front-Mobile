/* global expect it describe */

import React from 'react';
import {shallow} from 'enzyme';
import Balance from './Balance';

describe('Balance', () => {
    it('should show endBalance ', () => {
        const data = {amount: 1000.0, currency: 'IDR'};
        const wrapper = shallow(<Balance data={data}/>);
        expect(wrapper.find('#endBalance')).toBeDefined();
    });
    it('should show currency ', () => {
        const data = {balance: 1000.0, currency: 'IDR'};
        const wrapper = shallow(<Balance data={data}/>);
        expect(wrapper.find('#currency')).toBeDefined();
    });
});
