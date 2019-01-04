import React from 'react';
import Button from '../../../components/button';
import isPaginated from '../../../lib/is-paginated'
import styles from './index.css';
import { findByQuery } from '../../../lib/repository/adapters/in-memory';
import { eq } from '../../../lib/repository/operators';
import { q, where } from '../../../lib/repository/query-builder';


export default isPaginated({ itemsPropName: 'moneyTransactions' }, ({ 
    moneyTransactions, 
    users, 
    onDestroy,
    onPageChange,
    pageCount, 
}) => (
    <React.Fragment>
        <ul className={styles.wrapper}>
            { moneyTransactions.map(({ id, creditorId, debitorId, amount }) => (
                <li key={id} className={styles.row}>
                    <span>
                        { findByQuery(where(q({ id: eq(debitorId) })), users).name }
                        { findByQuery(where(q({ id: eq(creditorId) })), users).name } 
                        { amount }    
                    </span>
                    
                    <Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) }))) }>
                        Delete
                    </Button>
                </li>
            )) }
        </ul>
        
        { Array.from({ length: pageCount }).map((_, index) => (
            <span onClick={ () => onPageChange(index) } key={index}>
                { index + 1 }
            </span>
        )) }
    </React.Fragment>
    
));