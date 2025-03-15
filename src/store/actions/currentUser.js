export const CREATE_USER = 'CREATE_USER';

export function createUser(userInfo) {
    return {
        type: CREATE_USER,
        userInfo
    }
}
