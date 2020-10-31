const TOKEN_KEY = 'customerDetails';
export const login = (user) =>{
    const json = JSON.stringify(user);
    localStorage.setItem(TOKEN_KEY,json);
    console.log(localStorage.getItem(TOKEN_KEY));
}

export const logout = () => {
    localStorage.setItem(TOKEN_KEY,"");
    console.log(localStorage.getItem(TOKEN_KEY));
}

export const isLogin = () =>{
    if(localStorage.getItem(TOKEN_KEY)){
        return true;
    }
    return false;
}

export const isAdmin = () =>{
    if(isLogin())
    if(JSON.parse(localStorage.getItem(TOKEN_KEY))=="admin"){
        return true;
    }
    console.log("in auth",localStorage.getItem(TOKEN_KEY));
    return false;
}