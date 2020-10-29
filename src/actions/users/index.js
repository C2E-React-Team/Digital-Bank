// export const REGISTER_USER = 'REGISTER_USER';
// export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
// export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
export const LOGOUT_USER = 'LOGOUT_USER';

export const loginUser = (data)=> {
    return {
        type:LOGIN_USER,
        data }
    };
    export const logoutUser = ()=> {
        return {
            type:LOGOUT_USER
           }
        };