export const ADD_SHOW = "ADD_SHOW";
export const SET_ID = "SET_ID";
export function addShow(text) {
    return {
        type: ADD_SHOW,
        payload: text
    }
}

export function setId(id) {
    return {
        type: SET_ID,
        payload: id
    }
}