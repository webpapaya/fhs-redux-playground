import React from 'react';
import Button from '../../components/button';

import PaginationBar from '../../components/pagination-bar';
import isPaginated from '../../lib/is-paginated'
import styles from './organism.css';
import { q, findByQuery, eq, where } from '../../lib/repository';

export default isPaginated({
    pageSize: 3,
    itemsLoadingFnName: 'onMoneyTransactionsLoad', 
    itemsPropName: 'moneyTransactions' 
}, ({ 
    moneyTransactions, 
    users, 
    onDestroy,
    onPageChange,
    pageCount, 
    currentPage,
}) => (
    <React.Fragment>
        <ul className={styles.wrapper}>
            { moneyTransactions.map(({ id, creditorId, debitorId, amount }) => (
                <li key={id} className={styles.row}>
                    <span>
                        { id }
                        { findByQuery(q(where({ id: eq(debitorId) })), users).name }
                        { findByQuery(q(where({ id: eq(creditorId) })), users).name } 
                        { amount }    
                    </span>
                    
                    <Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) }))) }>
                        Delete
                    </Button>
                </li>
            )) }
        </ul>

        <PaginationBar 
            onPageClick={ onPageChange } 
            currentPage={ currentPage } 
            pageCount={ pageCount} 
        />
    </React.Fragment>
    
));