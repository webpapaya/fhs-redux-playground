import React from 'react';
import PropTypes from 'prop-types';
import styles from './organism.css';
import BarChart from '../../components/bar-chart';
import { useTranslation } from './translations';

const Organism = ({ totalAmount, debitAmount, creditAmount }) => {
	const { t } = useTranslation();
	return (
		<section className={styles.wrapper}>
			<BarChart items={[
				{
					value: Math.abs(debitAmount),
					className: styles.debitLine,
					label: t('debit', { value: debitAmount }),
				}, {
					value: Math.abs(creditAmount),
					className: styles.creditLine,
					label: t('credit', { value: creditAmount }),
				},
			]}
			/>
			<span className={`${styles.amount} ${totalAmount >= 0 ? styles.positive : styles.negative}`}>
				{ t('eur', { value: totalAmount }) }
			</span>
			<span className={styles.total}>Total</span>
		</section>
	);
};

Organism.propTypes = {
	totalAmount: PropTypes.number.isRequired,
	debitAmount: PropTypes.number.isRequired,
	creditAmount: PropTypes.number.isRequired,
};

export default Organism;
