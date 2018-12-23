import React from 'react';
import styles from './organism.css';

const formatEuro = (amount) => `${parseFloat(amount).toFixed(2)} €`;

export default ({ totalBalance }) => (
    <section className={styles.wrapper}>
        { formatEuro(totalBalance) }
    </section>
    
);