import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.css';
import className from '../lib/class-name';

const Component = ({ 
  type = 'button',
  color='primary', 
  disabled, 
  children, 
  onClick,
  block,
}) => (
  <button 
    type={type} 
    disabled={disabled} 
    onClick={onClick}
    className={className(
      styles.button, 
      styles[`color-${color}`],
      block && styles.block,
      disabled && styles.disabled
    )}
  >
    { children }
  </ button> 
);

Component.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  color: PropTypes.oneOf(['primary', 'success', 'danger']),
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
  block: PropTypes.bool,
};

export default Component;