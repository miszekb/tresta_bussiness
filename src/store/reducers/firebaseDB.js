import { SET_FIREBASE_DB } from "../actions/firebaseDB";

export default function firebaseDB(state={}, action) {
    switch (action.type) {
        case SET_FIREBASE_DB:
            return {
                ...state,
                firebaseDB: action.firebaseDB
            }
        default:
            return state;
    }
}