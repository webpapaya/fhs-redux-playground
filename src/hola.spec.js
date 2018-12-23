import { assertThat, hasProperties } from 'hamjest';
import { fetchPost, setAuthorizationToken} from './domain/fetch';

const createEntity = (url, payload = {}) => fetchPost(url, payload)
    .then((entities) => entities[0])

const signUpAndIn = async ({ email, name, password }) => {
    await fetchPost('rpc/user_sign_up', { email, pass: password });
    await signIn({ email, password })
    return createEntity('users', { name });
}

const signIn = async ({ email, password }) => {
    const response = await fetchPost('rpc/user_sign_in', { email, pass: password });
    const firstUserToken = response[0].token; 
    setAuthorizationToken(firstUserToken);
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
            debitorId: debitor.id,
            creditorId: creditor.id,
            amount: 10
        };
        
        const transaction = await createEntity('money_transactions', moneyTransactionsParams);
        assertThat(transaction, hasProperties(moneyTransactionsParams))
})

