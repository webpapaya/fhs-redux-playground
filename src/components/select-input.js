import React from 'react';
import isInput from '../lib/is-input';

export default isInput({}, ({ Select, Label, Option, options, noSelectionText, label, ...props }) => (
    <div>
        <Label>{ label }</Label>
        <Select { ...props }>
            <Option>{ noSelectionText || 'Please select' }</Option>
            { options.map(({ value, label }) => (<Option key={value} value={value}>{ label }</Option>))}
        </Select>        
    </div>
));