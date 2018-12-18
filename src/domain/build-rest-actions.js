
import { memoize } from 'redux-memoize';
import { 
    fetchPost, 
    fetchPatch, 
    fetchGet,
    fetchDelete, 
} from './fetch';

const queryParamForValue = (value) => {
    if (value === null) { return 'is.null'; }
    if (Array.isArray(value)) { return `in.(${value.join(',')})`; }
    return `eq.${value}`;
}

const filterToParams = (resource, filter = {}) => {
    const queryString = Object.keys(filter).reduce((string, key) => {
        const value = filter[key];
        return `${string}&${key}=${queryParamForValue(value)}`;
    }, '?');

    return `${resource}${queryString}`;
} 

const buildRestActions = ({ resource, only }) => {
    const where = memoize({}, (filter) => (dispatch) => Promise.resolve()
        .then(() => fetchGet(filterToParams(resource, filter)))
        .then((payload) => dispatch({ type: `${resource}/where/success`, payload })));

    const create = (payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPost(resource, payload))
        .then((payload) => dispatch({ type: `${resource}/create/success`, payload }));

    const update = (filter, payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPatch(filterToParams(resource, filter), payload))
        .then((payload) => dispatch({ type: `${resource}/update/success`, payload }));

    const destroy = (filter) => (dispatch) => Promise.resolve()
        .then(() => fetchDelete(filterToParams(resource, filter), filter))
        .then((payload) => dispatch({ type: `${resource}/destroy/success`, payload }));

    const actions = { where, create, update, destroy };

    if (!Array.isArray(only)) { return actions; }

    return only.reduce((acc, fnName) => {
        if (fnName in actions) { acc[fnName] = actions[fnName]; }
        return acc;
    }, {});
};

export default buildRestActions;