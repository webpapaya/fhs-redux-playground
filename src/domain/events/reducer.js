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
        case '@EVENTS:fetched': return uniqueId([...state, ...action.payload]);
        case '@EVENTS:destroyed': return state.filter((event) => event.id !== action.payload.id);
        default: return state
    }
}