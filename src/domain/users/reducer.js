const initialState = [];
export default (state = initialState, action) => {
    switch(action.type) {
        case 'users/fetched': return [...state, ...action.payload];
        default: return state
    }
}