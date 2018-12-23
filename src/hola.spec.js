import { assertThat, hasProperties } from 'hamjest';
import { fetchPost, setAuthorizationToken, unsetAuthorizationToken, fetchGet} from './domain/fetch';


const createEntities = (url, payload = {}) => fetchPost(url, payload);

const signIn = async ({ email, password }) => {
    const response = await fetchPost('rpc/user_sign_in', { email, pass: password });
    const firstUserToken = response[0].token; 
    setAuthorizationToken(firstUserToken);
}


const signUp = async ({ email, name, password }) => {
    try {
        await fetchPost('rpc/user_sign_up', { email, pass: password });
        await signIn({ email, password });
        const user = await createEntities('users', { name });
        unsetAuthorizationToken();
        return user
    } catch (e) {}
}

it('returns ', async () => {
    jest.setTimeout(100000000);
    await signUp({ email: 'thomas@mayrhofer.at', name: 'Thomas Mayrhofer', password: 1234 });
    await Promise.all(Array.from({ length: 100 }).map(() => signUp({ 
        name: `sepp-${+new Date()}-${Math.random()}`,
        email: `sepp-${+new Date()}-${Math.random()}@test.at`,
        password: '1234',
    })));

    const users = await fetchGet('users');
    return createEntities('money_transactions', Array.from({ length: 500000 }).map(() => {
        return {
            debitorId: users[Math.floor((Math.random() * users.length))].id,
            creditorId: users[Math.floor((Math.random() * users.length))].id,
            amount: (Math.random() * 200 - 100).toFixed(2),
            createdAt: new Date(+new Date(Math.random() * 1000*60*60*24*365*5) + (+new Date('2015-01-01'))).toISOString(),
        };
    }));
});

