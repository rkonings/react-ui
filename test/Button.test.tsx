import 'jest-styled-components';
import * as React from 'react';
import Theme from '../src/themes/default';
import Button, { GhostButton } from './../src/Button/Button';
import { mountWithTheme, shallowWithTheme } from './helpers';

test('render button label', () => {
    const wrapper = shallowWithTheme(<Button>Button</Button>);
    expect(wrapper.html()).toContain('Button</span>');
});

test('execute onClick function', () => {
    const onClick = jest.fn();
    const wrapper = mountWithTheme(<Button onClick={onClick}>Button</Button>);
    wrapper.simulate('click');
    expect(onClick).toBeCalled();
});

test('render primary button', () => {
    const wrapper = mountWithTheme(<Button type="primary">Button</Button>);
    expect(wrapper).toHaveStyleRule('color', Theme.button.primary.default.color);
});

test('render secondairy button', () => {
    const wrapper = mountWithTheme(<Button type="secondairy">Button</Button>);
    expect(wrapper).toHaveStyleRule('color', Theme.button.secondairy.default.color);
});

test('render ghost button', () => {
    const wrapper = mountWithTheme(<GhostButton>Button</GhostButton>);
    expect(wrapper).toHaveStyleRule('color', Theme.button.default.default.ghostColor);
});

test('render ghost button primary', () => {
    const wrapper = mountWithTheme(<GhostButton type="primary">Button</GhostButton>);
    expect(wrapper).toHaveStyleRule('color', Theme.button.primary.default.ghostColor);
});

test('render ghost button secondairy', () => {
    const wrapper = mountWithTheme(<GhostButton type="secondairy">Button</GhostButton>);
    expect(wrapper).toHaveStyleRule('color', Theme.button.secondairy.default.ghostColor);
});
