import React from 'react';
import { Link } from 'react-router-dom';

const Component = ({ to, children }) => (
  <Link to={to}>{ children }</Link> 
);

export default Component;