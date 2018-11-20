import React from 'react';
import buildInput from './build-input';
import { assertThat, hasProperties, equalTo } from 'hamjest';

import { mount, render, shallow } from "enzyme";

test('passes props to input', () => {
    const MyInput = buildInput(({ Input, ...props }) => (
        <Input { ...props } />
    ));
    
    const input = mount(<MyInput autoComplete="true"/>).find('input');
    assertThat(input.props(), hasProperties({ autoComplete: 'true' }));
});


describe('isFocused', () => {
    test('false, initially', () => {
        const MyInput = buildInput(({ Input }) => <Input />);
        const wrapper = mount(<MyInput />);
        assertThat(wrapper.children().props(), hasProperties({ isFocused: false }));    
    });

    test('true, when focused', () => {
        const MyInput = buildInput(({ Input }) => <Input />);
        const wrapper = mount(<MyInput />);
        wrapper.find('input').simulate('focus');
        assertThat(wrapper.children().props(), hasProperties({ isFocused: true }));    
    });

    test('false, when focused and blured afterwards', () => {
        const MyInput = buildInput(({ Input }) => <Input />);
        const wrapper = mount(<MyInput />);
        wrapper.find('input').simulate('focus');
        wrapper.find('input').simulate('blur');
        assertThat(wrapper.children().props(), hasProperties({ isFocused: false }));    
    });
})
