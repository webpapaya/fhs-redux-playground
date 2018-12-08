import fetch from 'node-fetch';

const BASE_URL = 'http://0.0.0.0:3000';

const fetchPost = (url, payload, token) => {
    return fetch(`${BASE_URL}/${url}`, { 
       method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',  
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload),
    });
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
        .then(() => fetchPost('rpc/sign_up', credentials))
        .then(() => fetchPost('rpc/sign_in', credentials))
        .then(res => res.json())
        .then((response) => {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGhvbWFzQG1heXJob2Zlci5hdCIsInJvbGUiOiJtZW1iZXIifQ.ivxVe0VDhAs5Qm9BBw49ShgjiqAuKjeHH_cHS6PTrjI"
            // response[0].token;

            return Promise.resolve()
                .then(() => fetchGet('events', { name: 'dsfjkal' }, token))
                .then((res) => res.text())
                .then((res) => console.log(res))
        });
})

