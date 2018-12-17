import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import UserSignUp from './container/user-sign-up';
import UserSignIn from './container/user-sign-in';
import MoneyTransferCreate from './container/money-transaction-create';

export default () => (
    <Switch>
        <Route path='/money-transactions' component={ MoneyTransferCreate } />
        <Route path='/user-sign-up' component={ UserSignUp } />
        <Route path='/user-sign-in' component={ UserSignIn } />
        <Redirect to='/user-sign-in' />
    </Switch>
);