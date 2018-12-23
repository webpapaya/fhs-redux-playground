const INITIAL_STATE = {
    reloadMoneyTransactionReports: 0,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `money_transactions/update/success`:
        case `money_transactions/create/success`:
        case `money_transactions/destroy/success`:
            return { ...state, reloadMoneyTransactionReports: state.reloadMoneyTransactionReports + 1 };
        case `reset`:
            cache.clear();
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default reducer;