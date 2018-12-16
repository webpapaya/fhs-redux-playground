import React from 'react';

const labelStyles = {
    fontWeight: 'bold',
    display: 'block',
    font: 'sans-serif'
};

const inputStyles = {
    border: 'none',
    paddingTop: '10px',
    borderBottom: '2px solid orange'
};

const Molecule = ({ Input, Label, label, icon, showProps, ...props }) => (
    <div>
        <Label style={labelStyles}>{ label } { icon }</Label>
        <Input style={inputStyles} { ...props }  />
        { showProps && <div>{ JSON.stringify(props)}</div> }
    </div>
);

export default Molecule;