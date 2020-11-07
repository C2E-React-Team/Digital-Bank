export const TOKEN_KEY = 'customerDetails';

export const login = (user) =>{
    const json = JSON.stringify(user);
    localStorage.setItem(TOKEN_KEY,json);
    console.log("in login",localStorage.getItem(TOKEN_KEY));
}

export const logout = () => {
    localStorage.setItem(TOKEN_KEY,"");
    console.log(localStorage.getItem(TOKEN_KEY));
}

export const isLogin = () =>{
    if(localStorage.getItem(TOKEN_KEY)){
        return true;
    }
    console.log("in islogin",localStorage.getItem(TOKEN_KEY));
    return false;
}

export const isAdmin = () =>{
    if(isLogin())
    if(JSON.parse(localStorage.getItem(TOKEN_KEY))=="admin"){
        return true;
    }
    console.log("in isAdmin",localStorage.getItem(TOKEN_KEY));
    return false;
}

export const isDealer = () =>{
    if(isLogin())
    if(JSON.parse(localStorage.getItem(TOKEN_KEY)).dealerid){
        return true;
    }
    console.log("in isDealer",localStorage.getItem(TOKEN_KEY));
    return false;
}