import React from 'react';
import Button from '../../../components/button';
import styles from './index.css';


export default ({ moneyTransactions, users, onDestroy }) => (
    <ul className={styles.wrapper}>
        { moneyTransactions.map(({ id, creditorId, debitorId, amount }) => (
            <li key={id} className={styles.row}>
                <span>
                    { (users.find((user) => user.id === creditorId ) || {}).name } - 
                    { (users.find((user) => user.id === debitorId ) || {}).name } - 
                    { amount }    
                </span>
                
                <Button color="danger" onClick={() => onDestroy({ id })}>
                    Delete
                </Button>
            </li>
        )) }
    </ul>
);