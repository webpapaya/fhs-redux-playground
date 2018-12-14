import axios from 'axios';
import { assertThat, hasProperties } from 'hamjest';

const BASE_URL = 'http://0.0.0.0:3000';
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
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

const createEntity = (url, payload = {}) => api.post(url, payload)
    .then(({ data }) => data[0])

const signUpAndIn = async ({ email, name, password }) => {
    await api.post('rpc/user_sign_up', { email, pass: password });
    await signIn({ email, password })
    return createEntity('users', { name });
}

const signIn = async ({ email, password }) => {
    const response = await api.post('rpc/user_sign_in', { email, pass: password });
    const firstUserToken = response.data[0].token; 
    setAuthorisationToken(firstUserToken);
}

it('returns ', async () => {
        const debitorParams = {
            email: `debitor-${+new Date()}@test.com`,
            name: 'creditor',
            password: '1234'
        };

        const creditorParams = {
            email: `creditor-${+new Date()}@test.com`,
            name: 'debitor',
            password: '1234'
        };
    
        const debitor = await signUpAndIn(debitorParams);
        const creditor = await signUpAndIn(creditorParams);
        const moneyTransactionsParams = {
            debitor_id: debitor.id,
            creditor_id: creditor.id,
            amount: 10
        };
        
        const transaction = await createEntity('money_transactions', moneyTransactionsParams);
        assertThat(transaction, hasProperties(moneyTransactionsParams))
})

