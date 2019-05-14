import { pick } from 'ramda';

const merge = (uniqueKeys, records) => {
	const obj = records.reduce((result, record) => {
		/* eslint-disable no-param-reassign */
		if (uniqueKeys.length === 1) {
			result[record.id] = record;
		} else {
			result[JSON.stringify(pick(uniqueKeys, record))] = record;
		}
		return result;
	}, {});
	return Object.values(obj);
};

const remove = (state, except) => {
	const ids = except.map(record => record.id);
	return state.filter(record => !ids.includes(record.id));
};

const INITIAL_STATE = [];
const buildRestReducer = ({ resource, uniqueKeys = ['id'] }) => (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case `${resource}/create/success`:
			return merge(uniqueKeys, [...state, action.payload]);
		case `${resource}/update/success`:
		case `${resource}/where/success`:
			return merge(uniqueKeys, [...state, ...action.payload]);
		case `${resource}/destroy/success`:
			return remove(state, action.payload);
		case 'reset':
			return INITIAL_STATE;
		default:
			return state;
	}
};

export default buildRestReducer;
