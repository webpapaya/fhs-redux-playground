import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import linkStyles from './link.css';
import buttonStyles from './button.css';
import className from '../lib/class-name';

const Component = ({
	to, children, variant, color,
}) => (
	<NavLink
		to={to}
		activeClassName={className(
			variant === 'button' && buttonStyles.disabled,
		)}
		className={className(
			variant === 'link' && linkStyles.link,
			variant === 'button' && buttonStyles.button,
			variant === 'button' && color === 'primary' && buttonStyles['color-primary'],
		)}
	>
		{ children }
	</NavLink>
);

Component.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	variant: PropTypes.oneOf(['link', 'button']),
	color: PropTypes.oneOf(['primary']),
};

Component.defaultProps = {
	variant: 'link',
	color: 'primary',
};

export default Component;
