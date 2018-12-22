import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import UserSignUp from './container/user-sign-up';
import UserSignIn from './container/user-sign-in';
import MoneyTransferCreate from './container/money-transaction-create';
import MoneyTransactionList from './container/money-transaction-list';
import MoneyTransactionReports from './container/money-transaction-reports';

import WhenUserAuthentication from './container/when-user-authenticated';

export default () => (
    <Switch>
        <WhenUserAuthentication authenticated={true}>
            <Route path='/money-transactions' component={ () => (
                <React.Fragment>
                    <MoneyTransferCreate />
                    <MoneyTransactionList />
                    <MoneyTransactionReports />
                </React.Fragment>
            ) } />
            <Redirect to='/money-transactions' />
        </WhenUserAuthentication>

        <WhenUserAuthentication authenticated={ false }>
            <Route path='/user-sign-up' component={ UserSignUp } />
            <Route path='/user-sign-in' component={ UserSignIn } />
            <Redirect to='/user-sign-in' />
        </WhenUserAuthentication>

        <Redirect to='/' />
    </Switch>
);