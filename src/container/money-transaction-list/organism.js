import React from 'react';
import Button from '../../components/button';
export default (({ moneyTransactions, users, onDestroy }) => (
    <ul>
        { moneyTransactions.map(({ id, creditorId, debitorId, amount }) => (
            <li key={id}>
                { (users.find((user) => user.id === creditorId ) || {}).name } - 
                { (users.find((user) => user.id === debitorId ) || {}).name } - 
                { amount }
                <Button onClick={() => onDestroy({ id })}>
                    Delete
                </Button>
            </li>
        )) }
    </ul>
));