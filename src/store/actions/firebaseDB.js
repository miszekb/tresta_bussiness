export const SET_FIREBASE_DB = 'SET_FIREBASE_DB';

export function setFirebaseDB(firebaseDB) {
    return {
        type: SET_FIREBASE_DB,
        firebaseDB
    }
}