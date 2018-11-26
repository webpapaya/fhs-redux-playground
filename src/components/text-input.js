import React from 'react';
import isInput from '../lib/is-input';

export default isInput({}, ({ Input, Label, label }) => (
    <Label>{ label }<Input /></Label>));