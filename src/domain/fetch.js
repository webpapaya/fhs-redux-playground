import camelCaseKeys from 'camelcase-keys-deep';
import decamelCaseKeys from 'decamelize-keys-deep';


const buildFetch = (url, method, options = {}) => global.fetch(`http://localhost:3000/${url}`, ({ 
    ...options,
    ...(options.body ? { body: JSON.stringify(decamelCaseKeys(options.body)) } : {}), 
    headers: { ...(options.headers || {}), 'Content-Type': 'application/json' },   
    method: method,
}));

const wait = (ms) => (args) => new Promise(resolve => {
    setTimeout(() =>  resolve(args), ms)
});


export const fetchGet = (url, options) => buildFetch(url, 'GET', options)
                                            .then(wait(1000))
                                            .then((res) => res.json())
                                            .then(camelCaseKeys);
                                            
export const fetchPost = (url, options) => buildFetch(url, 'POST', options);
export const fetchPatch = (url, options) => buildFetch(url, 'PATCH', options);
export const fetchDelete = (url, options) => buildFetch(url, 'DELETE', options);