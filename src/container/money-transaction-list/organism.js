import React from 'react';
import {
	q, findByQuery, eq, where,
} from 'datenkrake';
import Button from '../../components/button';
import ListItem from '../../components/list-item';
import className from '../../lib/class-name';

import PaginationBar from '../../components/pagination-bar';
import isPaginated from '../../lib/is-paginated';
import formatCurrency from '../../helper/format-currency';
import styles from './organism.css';

export default isPaginated({
	pageSize: 10,
	itemsLoadingFnName: 'onMoneyTransactionsLoad',
	itemsPropName: 'moneyTransactions',
}, ({
	userId,
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
			}) => {
				const isDebt = userId === debitorId;
				const otherUserId = isDebt ? creditorId : debitorId;
				const otherUser = findByQuery(q(where({ id: eq(otherUserId) })), users);
				const signedAmount = isDebt ? amount * -1 : amount;

				return (
				<ListItem
					key={id}
					header={(
						<>
							<span className={styles.name}>{ otherUser.name }</span>
							<span 
								className={className(
									styles.amount,
									isDebt ? styles.debt : styles.credit
								)}
							>
								{ formatCurrency(signedAmount) }
							</span>
							<Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) })))}>
								{'Delete'}
							</Button>
						</>
					)}
				/>
			)}) }
		</ul>

		<PaginationBar
			onPageClick={onPageChange}
			currentPage={currentPage}
			pageCount={pageCount}
		/>
	</React.Fragment>

));
