import React from 'react';

const Component = ({ type = 'button', disabled, children, onClick }) => (
  <button type={type} disabled={disabled} onClick={onClick}>
    { children }
  </ button> 
);

export default Component;