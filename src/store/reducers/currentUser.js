import { CREATE_USER } from "../actions/currentUser";

export default function currentUser(state={}, action) {
    switch (action.type) {
        case CREATE_USER:
            return {
                ...state,
                currentUser: action.userInfo
            }
        default:
            return state;
    }
}