import React from 'react';
import styles from './organism.css';
import Button from '../../components/button';

const Organism = ({ onUserSignOut }) => (
    <nav className={styles.wrapper}>
        My friend owes me
        <Button onClick={onUserSignOut} variant="outlined">Sign out</Button>
    </nav>
)

export default Organism;