import React from 'react';
import PropTypes from 'prop-types';
import styles from './organism.css';
import Button from '../../components/button';
import Link from '../../components/link';
import Icon from '../../components/icon';
import {useTranslation} from './translations';

const Organism = ({ onUserSignOut }) => {
	const {t} = useTranslation();
	return (
	<nav className={styles.wrapper}>
		{ 'My friend owes me' }
		<Link to="/money-transactions" variant="button">
			<Icon name="money" />
		</Link>
		<Link to="/settings" variant="button">
			<Icon name="settings" />
		</Link>
		<Button onClick={onUserSignOut} variant="outlined">{t('signOut')}</Button>
	</nav>
)};

Organism.propTypes = {
	onUserSignOut: PropTypes.func.isRequired,
};

export default Organism;
