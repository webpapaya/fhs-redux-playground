
import { memoize } from 'redux-memoize';
import { 
    fetchPost, 
    fetchPatch, 
    fetchGet,
    fetchDelete, 
} from './fetch';

const filterToParams = (resource, filter = {}) => {
    const queryString = Object.keys(filter).reduce((string, key) => {
        const value = filter[key];
        const queryParam = Array.isArray(value)
            ? `${key}=in.(${value.join(',')})`
            : `${key}=eq.${filter[key]}`;

        return `${string}&${queryParam}`;
    }, '?');

    return `${resource}${queryString}`;
} 

const buildRestActions = ({ resource }) => {
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

    return { where, create, update, destroy };
};

export default buildRestActions;