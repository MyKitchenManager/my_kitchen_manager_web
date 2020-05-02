export const SET_ID = "SET_ID";
export const SET_USERNAME = "SET_USERNAME";
export const SET_PASSWORD = "SET_PASSWORD";

export function setUsername(text){
    return {
        type: SET_USERNAME,
        payload: text
    }
}

export function setPassword(text){
    return {
        type: SET_PASSWORD,
        payload: text
    }
}

export function setId(id) {
    return {
        type: SET_ID,
        payload: id
    }
}