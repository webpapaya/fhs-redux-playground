import React from 'react';
import { storiesOf } from '@storybook/react';
import Organism from './organism';

const users = [
	{ id: 1, name: 'First User' },
	{ id: 2, name: 'Second User' },
];

const moneyTransactions = [
	{
		id: 1, debitorId: 1, creditorId: 2, amount: 20.2, createdAt: '2000-01-01',
	},
	{
		id: 2, debitorId: 2, creditorId: 1, amount: 10.2, createdAt: '2000-01-01',
	},
];

const onMoneyTransactionsLoad = () => Promise.resolve(moneyTransactions);

storiesOf('MoneyTransactionList', module)
	.add('default', () => (
		<Organism
			onMoneyTransactionsLoad={onMoneyTransactionsLoad}
			moneyTransactions={moneyTransactions}
			users={users}
			userId={users[1].id}
		/>
	));
