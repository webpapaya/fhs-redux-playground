import React from 'react';
import styles from './organism.css';
import BarChart from '../../components/bar-chart';

const toFixed = (amount) => parseFloat(amount).toFixed(2);
const toCurrencty = (amount) => `${toFixed(amount)} €`;


export default ({ totalBalance, debtAmount, creditAmount }) => (
    <section className={styles.wrapper}>
        <BarChart items={[
            { value: debtAmount, className: styles.debitLine, label: `${toCurrencty(debtAmount)} debt` },
            { value: creditAmount, className: styles.creditLine, label:`${toCurrencty(creditAmount)} credit` },
        ]} />
        <span className={`${styles.amount} ${totalBalance >= 0 ? styles.positive : styles.negative}`}>
            { toFixed(totalBalance) }
            <span className={`${styles.currency} ${totalBalance >= 0 ? styles.positive : styles.negative}`}>€</span>
        </span>
        <span className={styles.total}>Total</span>

        
    </section>
    
);