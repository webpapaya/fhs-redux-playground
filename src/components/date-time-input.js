import React from 'react';
import isInput from '../lib/is-input';
import Molecule from './molecule';

export default isInput({}, (props) => <Molecule { ...props } type="date" />);