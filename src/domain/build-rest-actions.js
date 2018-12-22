
import { memoize } from 'redux-memoize';
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
        .then((payload) => dispatch({ type: `${resource}/where/success`, payload }))
        .catch(logAndRethrow));

    const create = (payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPost(resource, payload))
        .then((payload) => dispatch({ type: `${resource}/create/success`, payload })
        .catch(logAndRethrow));

    const update = (filter, payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPatch(filterToParams(resource, filter), payload))
        .then((payload) => dispatch({ type: `${resource}/update/success`, payload })
        .catch(logAndRethrow));

    const destroy = (filter) => (dispatch) => Promise.resolve()
        .then(() => fetchDelete(filterToParams(resource, filter), filter))
        .then((payload) => dispatch({ type: `${resource}/destroy/success`, payload })
        .catch(logAndRethrow));

    const actions = { where, create, update, destroy };

    if (!Array.isArray(only)) { return actions; }

    return only.reduce((acc, fnName) => {
        if (fnName in actions) { acc[fnName] = actions[fnName]; }
        return acc;
    }, {});
};

export default buildRestActions;