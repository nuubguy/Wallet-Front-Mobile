/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import Balance from './Balance';

describe('Balance', () => {
  it('should be have endBalance component', () => {
    const data = { amount: 1000.0, currency: 'IDR' };
    const wrapper = shallow(<Balance data={data} />);
    expect(wrapper.find('#endBalance')).toBeDefined();
  });
  it('should be have currency component', () => {
    const data = { balance: 1000.0, currency: 'IDR' };
    const wrapper = shallow(<Balance data={data} />);
    expect(wrapper.find('#currency')).toBeDefined();
  });
});
