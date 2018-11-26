import React from 'react';
import isInput from '../lib/is-input';

const reducer = (value) => 
    value.replace(/ /g, '').replace(/[^\dA-Z]/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();

export default isInput({ reducer }, ({ Input, Label, label }) => (
    <Label>
        { label }
        <Input />
    </Label>));