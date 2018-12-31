import React from 'react';
import styles from './organism.css';
import BarChart from '../../components/bar-chart';

const toFixed = (amount) => parseFloat(amount).toFixed(2);
const toCurrencty = (amount) => `${toFixed(amount)} €`;


export default ({ totalAmount, debitAmount, creditAmount }) => (
    <section className={styles.wrapper}>
        <BarChart items={[
            { value: debitAmount, className: styles.debitLine, label: `${toCurrencty(debitAmount)} debt` },
            { value: creditAmount, className: styles.creditLine, label:`${toCurrencty(creditAmount)} credit` },
        ]} />
        <span className={`${styles.amount} ${totalAmount >= 0 ? styles.positive : styles.negative}`}>
            { toFixed(totalAmount) }
            <span className={`${styles.currency} ${totalAmount >= 0 ? styles.positive : styles.negative}`}>€</span>
        </span>
        <span className={styles.total}>Total</span>

        
    </section>
    
);