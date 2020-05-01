
const initial = {
    userid : 0
};
export const rootReducer = (state = initial, action) => {
    switch (action.type) {
        case 'ADD_SHOW':
            return Object.assign({}, initial, {
                shows: action.payload
            })
        case 'SET_ID':
            return Object.assign({}, {
                userid: action.payload
            })
        default:
            return initial;
    }
}
