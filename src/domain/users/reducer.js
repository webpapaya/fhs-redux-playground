const initialState = [];
const uniqueId = (list) => {
    const obj = list.reduce((result, item) => {
        result[item.id] = item;
        return result;
    }, {});
    return Object.values(obj);
}

export default (state = initialState, action) => {
    switch(action.type) {
        case '@USERS:fetched': return uniqueId([...state, ...action.payload]);
        default: return state
    }
}