/* global expect it describe */

import React from 'react';
import { shallow } from 'enzyme';
import AccountId from './AccountId';

describe('AccountId', () => {
  it('should show Account Id ', () => {
    const data = { accountId: 'A000000001' };
    const wrapper = shallow(<AccountId data={data} />);
    expect(wrapper.find('#accountId')).toBeDefined();
  });
});
