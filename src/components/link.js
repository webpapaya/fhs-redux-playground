import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './link.css';
import className from '../lib/class-name';

const Component = ({ to, children }) => (
	<Link
		to={to}
		className={className(styles.link)}
	>
		{ children }
	</Link>
);

Component.propTypes = {
	to: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
};

export default Component;
