import React from 'react';
import styles from './centered-panel.css';

export default ({ children }) => (
    <section className={styles.wrapper}>
        <div className={styles.centered}>
            { children }
        </div>
    </section>
)