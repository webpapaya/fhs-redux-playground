import React from 'react';
import isInput from '../lib/is-input';

export default isInput({}, (props) => <input {...props} type="hidden"/>);