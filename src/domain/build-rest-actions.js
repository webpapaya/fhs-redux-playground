
import { memoize } from 'redux-memoize';
import decamelCaseKeys from 'decamelize-keys-deep';
import decamelize from 'decamelize';
import { cache } from '../lib/memoize-actions';

import { 
    fetchPost, 
    fetchPatch, 
    fetchGet,
    fetchDelete, 
} from './fetch';

const logAndRethrow = (error) => {
    console.error(error);
    throw error;
}

const queryParamForValue = (value) => {
    if (value === null) { return 'is.null'; }
    if (Array.isArray(value)) { return `in.(${value.join(',')})`; }
    return `eq.${value}`;
};

const orderToParams = (order) => order.length > 0
    ? `order=${order.map((value) => decamelize(value)).join(',')}`
    : '';

const filterToParams = (resource, filter = {}, order = []) => {
    const preparededFilter = decamelCaseKeys(filter);
    const filterQueryString = Object.keys(preparededFilter).reduce((string, key) => {
        const value = preparededFilter[key];
        return `${string}&${key}=${queryParamForValue(value)}`;
    }, ``);
    const orderQueryString = orderToParams(order);
    return `${resource}?${filterQueryString}&${orderQueryString}`;
} 

const ignoreReturnFor = (fn) => (value) => Promise.resolve()
    .then(() => fn())
    .then(() => value);

const buildRestActions = ({ resource, only }) => {
    const where = memoize({}, (filter, { order } = {}) => (dispatch) => Promise.resolve()
        .then(() => fetchGet(filterToParams(resource, filter, order)))
        .then(({ payload, contentRange }) => dispatch({ 
            type: `${resource}/where/success`, 
            payload: payload, 
            meta: { contentRange } 
        }))
        .catch(logAndRethrow));
    
    const invalidateCache = () =>
        cache.delete(where.unmemoized);

    const create = (payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPost(resource, payload))
        .then(ignoreReturnFor(invalidateCache))
        .then(({ payload }) => dispatch({ type: `${resource}/create/success`, payload, meta: {} }))
        .catch(logAndRethrow);

    const update = (filter, payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPatch(filterToParams(resource, filter), payload))
        .then(ignoreReturnFor(invalidateCache))
        .then(({ payload }) => dispatch({ type: `${resource}/update/success`, payload, meta: {} }))
        .catch(logAndRethrow);

    const destroy = (filter) => (dispatch) => Promise.resolve()
        .then(() => fetchDelete(filterToParams(resource, filter), filter))
        .then(ignoreReturnFor(invalidateCache))
        .then(({ payload }) => dispatch({ type: `${resource}/destroy/success`, payload, meta: {} }))
        .catch(logAndRethrow);

    const actions = { where, create, update, destroy };

    if (!Array.isArray(only)) { return actions; }

    return only.reduce((acc, fnName) => {
        if (fnName in actions) { acc[fnName] = actions[fnName]; }
        return acc;
    }, {});
};

export default buildRestActions;