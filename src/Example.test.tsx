import { shallow } from 'enzyme';
import * as React from 'react';
import Example from './Example';

test('render Example', () => {
    const wrapper = shallow(<Example/>);

    expect(wrapper.html()).toContain('Example');
});
