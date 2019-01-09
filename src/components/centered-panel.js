import React from 'react';
import PropTypes from 'prop-types';
import styles from './centered-panel.css';

const Component = ({ children }) => (
	<section className={styles.wrapper}>
		<div className={styles.centered}>
			{ children }
		</div>
	</section>
);

Component.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Component;
