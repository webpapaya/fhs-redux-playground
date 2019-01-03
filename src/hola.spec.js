// import { assertThat, hasProperties } from 'hamjest';
// import { fetchPost, setAuthorizationToken, unsetAuthorizationToken, fetchGet} from './domain/fetch';


// const createEntities = (url, payload = {}) => fetchPost(url, payload);

// const signIn = async ({ email, password }) => {
//     const response = await fetchPost('rpc/user_sign_in', { email, pass: password });
//     const firstUserToken = response[0].token; 
//     setAuthorizationToken(firstUserToken);
// }

// function onlyUnique(value, index, self) { 
//     return self.indexOf(value) === index;
// }

// const fetchUniqueItems = (array, length) => {
//     const items = Array.from({ length }).map(() => {
//         return array[Math.floor((Math.random() * array.length))];
//     });
//     const uniqueItems = items.filter(onlyUnique);
//     if (uniqueItems.length !== length) { return fetchUniqueItems(array, length); }
//     return uniqueItems;
// }

// const signUp = async ({ email, name, password }) => {
//     try {
//         await fetchPost('rpc/user_sign_up', { email, pass: password });
//         await signIn({ email, password });
//         const user = await createEntities('users', { name });
//         unsetAuthorizationToken();
//         return user
//     } catch (e) {}
// }


// it('returns ', async () => {
//     jest.setTimeout(100000000);
//     await signUp({ email: 'thomas@mayrhofer.at', name: 'Thomas Mayrhofer', password: 1234 });
//     await Promise.all(Array.from({ length: 100 }).map(() => signUp({ 
//         name: `sepp-${+new Date()}-${Math.random()}`,
//         email: `sepp-${+new Date()}-${Math.random()}@test.at`,
//         password: '1234',
//     })));

//     const { records: users } = await fetchGet('users');
//     await users.reduce((promise, user) => {
        


//         return promise.then(() => {
            
//         });
//     }, Promise.resolve());


//     return createEntities('money_transactions', Array.from({ length: 500000 }).map(() => {
//         const [ creditor, debitor ] = fetchUniqueItems(users, 2);

//         return {
//             debitorId: creditor.id,
//             creditorId: debitor.id,
//             amount: (Math.random() * 200).toFixed(2),
//             createdAt: new Date(+new Date(Math.random() * 1000*60*60*24*365*5) + (+new Date('2015-01-01'))).toISOString(),
//         };
//     }));
// });

it('noop', () => {})
