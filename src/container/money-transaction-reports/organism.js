import React from 'react';
import PropTypes from 'prop-types';
import styles from './organism.css';
import BarChart from '../../components/bar-chart';

const toFixed = amount => parseFloat(amount).toFixed(2);
const toCurrencty = amount => `${toFixed(amount)} €`;


const Organism = ({ totalAmount, debitAmount, creditAmount }) => (
	<section className={styles.wrapper}>
		<BarChart items={[
			{ value: debitAmount, className: styles.debitLine, label: `${toCurrencty(debitAmount)} debt` },
			{ value: creditAmount, className: styles.creditLine, label: `${toCurrencty(creditAmount)} credit` },
		]}
		/>
		<span className={`${styles.amount} ${totalAmount >= 0 ? styles.positive : styles.negative}`}>
			{ toFixed(totalAmount) }
			<span className={`${styles.currency} ${totalAmount >= 0 ? styles.positive : styles.negative}`}>€</span>
		</span>
		<span className={styles.total}>Total</span>
	</section>
);

Organism.propTypes = {
	totalAmount: PropTypes.number.isRequired,
	debitAmount: PropTypes.number.isRequired,
	creditAmount: PropTypes.number.isRequired,
};

export default Organism;
