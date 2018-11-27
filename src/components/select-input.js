import React from 'react';
import isInput from '../lib/is-input';

export default isInput({}, ({ Select, Option, options, noSelectionText, ...props }) => (
    <Select { ...props }>
        <Option>{ noSelectionText || 'Please select' }</Option>
        { options.map(({ value, label }) => (<Option key={value} value={value}>{ label }</Option>))}
    </Select>
));
