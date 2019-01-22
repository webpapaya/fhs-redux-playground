import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserSignUp from './container/user-sign-up';
import UserSignIn from './container/user-sign-in';
import MoneyTransferCreate from './container/money-transaction-create';
import MoneyTransactionList from './container/money-transaction-list';
import MoneyTransactionReports from './container/money-transaction-reports';
import MoneyTransactionFilter from './container/money-transaction-filter';

import Navigation from './container/navigation';
import WhenUserAuthentication from './container/when-user-authenticated';
import CenteredPanel from './components/centered-panel';

const MoneyTransactionPage = () => (
	<React.Fragment>
		<Navigation />
		<MoneyTransactionReports />
		<MoneyTransferCreate />
		<MoneyTransactionFilter />
		<MoneyTransactionList />
	</React.Fragment>
);

export default () => (
	<React.Fragment>
		<WhenUserAuthentication authenticated>
			<Switch>
				<Route
					path="/money-transactions"
					component={MoneyTransactionPage}
				/>
				<Redirect to="/money-transactions" />
			</Switch>
		</WhenUserAuthentication>

		<WhenUserAuthentication authenticated={false}>
			<CenteredPanel>
				<Switch>
					<Route path="/user-sign-up" component={UserSignUp} />
					<Route path="/user-sign-in" component={UserSignIn} />
					<Redirect to="/user-sign-in" />
				</Switch>
			</CenteredPanel>
		</WhenUserAuthentication>
	</React.Fragment>
);
