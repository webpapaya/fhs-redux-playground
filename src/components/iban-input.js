import isInput from '../lib/is-input';
import Molecule from './molecule';

const reducer = (value) => 
    value.replace(/ /g, '').replace(/[^\dA-Z]/g, '').substring(0, 16).replace(/(.{4})/g, '$1 ').trim();

export default isInput({ reducer }, Molecule);