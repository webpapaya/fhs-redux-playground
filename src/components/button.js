import React from 'react';
import styles from './button.css';


const Component = ({ 
  type = 'button', 
  disabled, 
  children, 
  onClick,
  variant='filled' 
}) => (
  <button 
    type={type} 
    disabled={disabled} 
    onClick={onClick}
    className={`${styles.button} ${styles[variant]}`}
  >
    { children }
  </ button> 
);

export default Component;