import camelCaseKeys from 'camelcase-keys-deep';
import decamelCaseKeys from 'decamelize-keys-deep';
import axios from 'axios';

const BASE_URL = 'http://0.0.0.0:3000';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
    }
});

global.api = api;

export const setAuthorizationToken = (token) => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}

export const unsetAuthorizationToken = () => {
    api.defaults.headers['Authorization'] = null;
}

export const fetchGet = (url) => api.get(url).then(({ data }) => camelCaseKeys(data));
export const fetchPost = (url, body) => api.post(url, decamelCaseKeys(body)).then(({ data = {}}) => camelCaseKeys(data));
export const fetchPatch = (url, body) => api.patch(url, decamelCaseKeys(body)).then(({ data = {}}) => camelCaseKeys(data));
export const fetchDelete = (url, body) => api.delete(url, decamelCaseKeys(body)).then(({ data = {}}) => camelCaseKeys(data));
