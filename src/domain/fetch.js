import camelCaseKeys from 'camelcase-keys-deep';
import decamelCaseKeys from 'decamelize-keys-deep';
import axios from 'axios';

const BASE_URL = 'http://0.0.0.0:3000';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation,count=exact',
        'Range': '0-24'
    }
});

global.api = api;

export const setAuthorizationToken = (token) => {
    api.defaults.headers['Authorization'] = token
        ? `Bearer ${token}`
        : null;
}

export const unsetAuthorizationToken = () => 
    setAuthorizationToken(null);

const parseContentRange = (contentRange) => {
    const [range, total] = contentRange.split('/');
    const [from, to] = range.split('-');
    return {
        total: parseInt(total || to),
        from: parseInt(from),
        to: parseInt(to),
    };
} 
export const fetchGet = (url) => api.get(url).then(({ data, headers }) => {
    return { 
        payload: camelCaseKeys(data), 
        contentRange: parseContentRange(headers['content-range'])
    };
});

export const fetchPost = (url, body) => api.post(url, decamelCaseKeys(body)).then(({ data = {}}) => camelCaseKeys({ payload: data }));
export const fetchPatch = (url, body) => api.patch(url, decamelCaseKeys(body)).then(({ data = {}}) => camelCaseKeys({ payload: data }));
export const fetchDelete = (url, body) => api.delete(url, decamelCaseKeys(body)).then(({ data = {}}) => camelCaseKeys({ payload: data }));
