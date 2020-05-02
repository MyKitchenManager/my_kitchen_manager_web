
const initial = {
    username: "",
    password: "",
};
export const rootReducer = (state = initial, action) => {
    console.log(JSON.stringify(action))
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        case 'SET_PASSWORD':
            return {
                ...state,
                password: action.payload
            }
        case 'SET_ID':
            return Object.assign({}, {
                userid: action.payload
            })
        default:
            return state;
    }
}
