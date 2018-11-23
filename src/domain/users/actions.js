export const whereUsers = (...filter) => (dispatch) => {
    dispatch({
        type: 'users/fetched',
        payload: [{ firstName: 'Sepp', lastName: 'Huber', id: +new Date() }]
    });
}