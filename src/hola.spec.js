import axios from 'axios';

const BASE_URL = 'http://0.0.0.0:3000';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
const setAuthorisationToken = (token) => {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
}



const fetchGet = (url, token) => fetch(`${BASE_URL}/${url}`, { 
    headers: { 
        'Content-Type': 'application/json',  
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
}); 


it('hallo', () => {
    const credentials = {
        email: 'thomas@mayrhofer.at',
        pass: '1234',
    };

    return Promise.resolve()
        .then(() => api.post('events', { name: 'public event' }))
        .then(() => api.get('events'))
        .then((r) => console.log('p', r.data))
        .then(() => api.post('rpc/sign_up', credentials))
        .catch(() => "swallow error")
        .then(() => api.post('rpc/sign_in', credentials))

        .then((r) => setAuthorisationToken(r.data[0].token))
        .then(() => api.post('events', { name: 'member event' }))
        .then(() => api.get('events'))
        .then((r) => console.log('m', r.data))
        .catch((r) => console.log('m', r));;
})

