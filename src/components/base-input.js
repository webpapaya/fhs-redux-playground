import React from 'react';
import styles from './base-input.css';
import className from '../lib/class-name'


const Molecule = ({ Input, Label, label, icon, showProps, ...props }) => (
    <div>
        <Label className={className(styles.label)}>{ label } { icon }</Label>
        <Input 
            className={className(
                styles.input,
                props.focused && styles.focused
            )} 
            { ...props } 
        />
        { showProps && <div>{ JSON.stringify(props)}</div> }
    </div>
);

export default Molecule;