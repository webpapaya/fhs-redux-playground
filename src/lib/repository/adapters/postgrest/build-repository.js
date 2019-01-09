import camelCaseKeys from 'camelcase-keys-deep';
import decamelCaseKeys from 'decamelize-keys-deep';
import decamelize from 'decamelize';
import buildQueryParams from './query-params';
import { logError } from '../../../log';

const requiredParam = (name) => { throw Error(`${name} is a required parameter`); };

const logAndRethrow = (error) => {
	logError(error);
	throw error;
};

const parseContentRange = (contentRange) => {
	const [range, total] = contentRange.split('/');
	const [from, to] = range.split('-');
	return {
		total: parseInt(total || to, 10),
		from: parseInt(from, 10),
		to: parseInt(to, 10),
	};
};

const parseResponse = ({ data = [], headers = {} }) => ({
	payload: camelCaseKeys(data),
	meta: { contentRange: parseContentRange(headers['content-range']) },
});

const buildRepository = ({
	resource = requiredParam('path'),
	limit = 25,
}) => {
	const url = `${decamelize(resource)}`;

	const create = (connection, values) => Promise.resolve()
		.then(() => connection.post(url, decamelCaseKeys(values)))
		.then(parseResponse)
		.catch(logAndRethrow);

	const where = (connection, filter = {}) => {
		const hasPaginationOverwritten = filter.limit !== undefined || filter.offset !== undefined;
		const queryString = buildQueryParams(filter);
		const headers = hasPaginationOverwritten ? {} : { Range: `0-${limit - 1}` };

		return Promise.resolve()
			.then(() => connection.get(`${url}${queryString}`, { headers }))
			.then(parseResponse)
			.catch(logAndRethrow);
	};

	const update = (connection, filter, values) => Promise.resolve()
		.then(() => connection.patch(`${url}${buildQueryParams(filter)}`, decamelCaseKeys(values)))
		.then(parseResponse)
		.catch(logAndRethrow);

	const destroy = (connection, filter) => Promise.resolve()
		.then(() => connection.delete(`${url}${buildQueryParams(filter)}`))
		.then(parseResponse)
		.catch(logAndRethrow);

	return {
		create,
		where,
		update,
		destroy,
	};
};

export default buildRepository;
