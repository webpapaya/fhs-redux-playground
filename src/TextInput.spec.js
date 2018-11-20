import React from 'react';
import buildInput from './build-input';


test('renders an input component', () => {
    const MyInput = buildInput((_props, _context, { Input }) => {
        <Input />
    })
    console.log()
});