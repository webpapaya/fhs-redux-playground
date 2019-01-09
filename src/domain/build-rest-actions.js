
import { memoize } from 'redux-memoize';
import { cache } from '../lib/memoize-actions';
import { buildRepository } from '../lib/repository/adapters/postgrest';
import { connection } from './server-connection';

const ignoreReturnFor = fn => value => Promise.resolve()
	.then(() => fn())
	.then(() => value);

const buildRestActions = ({ resource, only }) => {
	const repository = buildRepository({ baseURL: 'http://localhost:3000', resource });

	const where = memoize({}, filter => dispatch => Promise.resolve()
		.then(() => repository.where(connection, filter))
		.then(({ payload, meta }) => dispatch({
			type: `${resource}/where/success`,
			payload,
			meta,
		})));

	const invalidateCache = () => cache.delete(where.unmemoized);

	const create = record => dispatch => Promise.resolve()
		.then(() => repository.create(connection, record))
		.then(ignoreReturnFor(invalidateCache))
		.then(({ payload }) => dispatch({ type: `${resource}/create/success`, payload, meta: {} }));

	const update = (filter, record) => dispatch => Promise.resolve()
		.then(() => repository.update(connection, filter, record))
		.then(ignoreReturnFor(invalidateCache))
		.then(({ payload }) => dispatch({ type: `${resource}/update/success`, payload, meta: {} }));

	const destroy = filter => dispatch => Promise.resolve()
		.then(() => repository.destroy(connection, filter))
		.then(ignoreReturnFor(invalidateCache))
		.then(({ payload }) => dispatch({ type: `${resource}/destroy/success`, payload, meta: {} }));

	const actions = {
		where, create, update, destroy,
	};

	if (!Array.isArray(only)) { return actions; }
	return only.reduce((acc, fnName) => {
		if (fnName in actions) { acc[fnName] = actions[fnName]; }
		return acc;
	}, {});
};

export default buildRestActions;
