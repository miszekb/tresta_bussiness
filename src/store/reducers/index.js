
import { combineReducers } from "redux";
import firebaseDB from './firebaseDB';
import currentUser from "./currentUser";

export default combineReducers({
    firebaseDB,
    currentUser
})