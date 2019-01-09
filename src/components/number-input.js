import React from 'react';
import isInput from '../lib/is-input';
import Molecule from './base-input';

export default isInput({}, (props) => <Molecule { ...props } type="number" />);