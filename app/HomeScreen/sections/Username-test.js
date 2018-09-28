/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import Username from './Username';

describe('Username', () => {
  it('should show Customer Name ', () => {
    const data = 'Zoomba';
    const wrapper = shallow(<Username data={data} />);
    expect(wrapper.find('#username')).toBeDefined();
  });
});
