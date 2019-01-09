import React from 'react';
import PropTypes from 'prop-types';
import styles from './organism.css';
import Button from '../../components/button';

const Organism = ({ onUserSignOut }) => (
	<nav className={styles.wrapper}>
		{ 'My friend owes me' }
		<Button onClick={onUserSignOut} variant="outlined">Sign out</Button>
	</nav>
);

Organism.propTypes = {
	onUserSignOut: PropTypes.func.isRequired,
};

export default Organism;
