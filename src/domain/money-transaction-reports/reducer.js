import buildRestReducer from '../build-rest-reducers';

export default buildRestReducer({
	resource: 'money_transaction_reports',
	uniqueKeys: ['userId', 'type', 'granularity', 'date'],
});
