import React from 'react';
import PropTypes from 'prop-types';
import styles from './button.css';
import className from '../lib/class-name';

const Component = ({
	type,
	color,
	disabled,
	children,
	onClick,
	block,
}) => (
	<button // eslint-disable-line react/button-has-type
		type={type}
		disabled={disabled}
		onClick={onClick}
		className={className(
			styles.button,
			styles[`color-${color}`],
			block && styles.block,
			disabled && styles.disabled,
			disabled && styles['not-allowed'],
		)}
	>
		{ children }
	</button>
);

Component.propTypes = {
	type: PropTypes.oneOf(['button', 'submit']),
	color: PropTypes.oneOf(['primary', 'success', 'danger']),
	disabled: PropTypes.bool,
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func,
	block: PropTypes.bool,
};

Component.defaultProps = {
	type: 'button',
	color: 'primary',
	disabled: false,
	block: false,
	onClick: undefined,
};

export default Component;
