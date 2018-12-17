const merge = (state, newRecords) => {
    const list = [...state, ...newRecords];
    const obj = list.reduce((result, item) => {
        result[item.id] = item;
        return result;
    }, {});
    return Object.values(obj);
}

const remove = (state, except) => {
    const ids = except.map((record) => record.id);
    return state.filter((record) => !ids.includes(record.id))
};

const INITIAL_STATE = [];
const buildRestReducer = ({ resource }) => (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case `${resource}/update/success`:
        case `${resource}/create/success`:
        case `${resource}/where/success`:
            return merge(state, action.payload);
        case `${resource}/destroy/success`:
            return remove(state, action.payload);
        case `reset`:
            return INITIAL_STATE;
        default:
            return state;
    }
}

export default buildRestReducer;