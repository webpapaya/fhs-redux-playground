import React from 'react';
import {
	q, findByQuery, eq, where,
} from 'datenkrake';
import Button from '../../components/button';
import ListItem from '../../components/list-item';
import CheckboxInput from '../../components/checkbox-input';
import className from '../../lib/class-name';

import PaginationBar from '../../components/pagination-bar';
import isPaginated from '../../lib/is-paginated';
import styles from './organism.css';
import { useTranslation } from './translations';


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
	onMoneyTransactionSubmit,
}) => (
	<React.Fragment>
		<ul className={styles.wrapper}>
			{ moneyTransactions.map(({
				id, creditorId, debitorId, amount, paidAt,
			}) => {
				const {t} = useTranslation();
				const isDebt = userId === debitorId;
				const otherUserId = isDebt ? creditorId : debitorId;
				const otherUser = findByQuery(q(where({ id: eq(otherUserId) })), users);
				const signedAmount = isDebt ? amount * -1 : amount;
				const updateFn = evt => onMoneyTransactionSubmit(q(where({ id: eq(id) })), {
					paidAt: evt.target.checked ? (new Date()).toISOString() : null,
				});

				return (
					<ListItem
						key={id}
						header={(
							<>
								<CheckboxInput
									onChange={updateFn}
									defaultChecked={!!paidAt}
								/>
								<span
									className={className(
										styles.name,
										paidAt && styles.paid,
									)}
								>
									{ otherUser.name }
								</span>
								<span
									className={className(
										styles.amount,
										isDebt ? styles.debt : styles.credit,
										paidAt && styles.paid,
									)}
								>
									{ t('eur', { value: signedAmount }) }
								</span>
								<Button color="danger" onClick={() => onDestroy(q(where({ id: eq(id) })))}>
									{'Delete'}
								</Button>
							</>
						)}
					/>
				);
			}) }
		</ul>

		<PaginationBar
			onPageClick={onPageChange}
			currentPage={currentPage}
			pageCount={pageCount}
		/>
	</React.Fragment>

));
