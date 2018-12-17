import React from 'react';

const Component = ({ type = 'button', disabled, children }) => (
  <button type={type} disabled={disabled}>
    { children }
  </ button> 
);

export default Component;