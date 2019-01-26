import React from 'react';
import {
	q, findByQuery, eq, where,
} from 'datenkrake';
import Button from '../../components/button';

import PaginationBar from '../../components/pagination-bar';
import isPaginated from '../../lib/is-paginated';
import styles from './organism.css';

export default isPaginated({
	pageSize: 10,
	itemsLoadingFnName: 'onMoneyTransactionsLoad',
	itemsPropName: 'moneyTransactions',
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
			{ moneyTransactions.map(({
				id, creditorId, debitorId, amount,
			}) => (
				<li key={id} className={styles.row}>
					<span>
						{ id }
						{ findByQuery(q(where({ id: eq(debitorId) })), users).name }
						{ findByQuery(q(where({ id: eq(creditorId) })), users).name }
						{ amount }
					</span>

					<Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) })))}>
						{'Delete'}
					</Button>
				</li>
			)) }
		</ul>

		<PaginationBar
			onPageClick={onPageChange}
			currentPage={currentPage}
			pageCount={pageCount}
		/>
	</React.Fragment>

));
