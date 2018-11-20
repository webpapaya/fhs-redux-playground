import React from 'react';
import buildInput from './build-input';
import renderer from 'react-test-renderer';
import { assertThat, hasProperty, equalTo } from 'hamjest';

test('passes props to input', () => {
    const props = { onChange: () => {} }
    const MyInput = buildInput(({ Input }) => (
        <Input { ...props } />
    ))
    const component = renderer.create(<MyInput />);
    assertThat(component.toJSON(), hasProperty('props', equalTo(props)))   
});