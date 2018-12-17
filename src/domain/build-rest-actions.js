import { 
    fetchPost, 
    fetchPatch, 
    fetchGet,
    fetchDelete, 
} from './fetch';

const buildRestActions = ({ resource }) => {
    const where = (_filter) => (dispatch) => Promise.resolve()
        .then(() => fetchGet(resource))
        .then((payload) => dispatch({ type: `${resource}/where/success`, payload }));

    const create = (payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPost(resource, payload))
        .then((payload) => dispatch({ type: `${resource}/create/success`, payload }));

    const update = (filter, payload) => (dispatch) => Promise.resolve()
        .then(() => fetchPatch(resource, payload))
        .then((payload) => dispatch({ type: `${resource}/update/success`, payload }));

    const destroy = (filter) => (dispatch) => Promise.resolve()
        .then(() => fetchDelete(resource, filter))
        .then((payload) => dispatch({ type: `${resource}/destroy/success`, payload }));

    return { where, create, update, destroy };
};

export default buildRestActions;