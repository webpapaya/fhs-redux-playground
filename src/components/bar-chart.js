import React from 'react';
import styles from './bar-chart.css';

export default ({ items }) => {
    const sum = items.reduce((sum, item) => sum + item.value, 0);
    return (
        <div className={styles.wrapper}>
            { items.map((item) => (
                <div 
                  className={styles.lineWrapper} 
                  style={{ width: `${100/ sum * item.value}%` }}
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