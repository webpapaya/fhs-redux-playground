import React from 'react';
import PropTypes from 'prop-types';
import styles from './bar-chart.css';

const Component = ({ items }) => {
	const sum = items.reduce((result, item) => result + item.value, 0);
	return (
		<div className={styles.wrapper}>
			{ items.map((item) => (
				<div
					key={ item.label }
					className={styles.lineWrapper}
					style={{ width: `${100 / sum * item.value}%` }}
				>
					<span className={`${styles.label}`}>
						{item.label}
					</span>
					<span className={`${styles.line} ${item.className}`} />
				</div>
			)) }
		</div>
	);
};

Component.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		value: PropTypes.number.isRequired,
		className: PropTypes.string,
		label: PropTypes.string,
	})).isRequired,
};

export default Component;
