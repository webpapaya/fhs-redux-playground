import React from 'react';
import { Link } from 'react-router-dom';
import styles from './link.css';
import className from '../lib/class-name';

const Component = ({ to, children }) => (
  <Link 
    to={to}
    className={styles.link}
  >
    { children }
  </Link> 
);

export default Component;