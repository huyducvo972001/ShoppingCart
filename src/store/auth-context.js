import React, { useState } from 'react'

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => { },
    logout: () => { },
    email: (email) => {}
});

export const AuthContextProvider = props => {
    const initialToken = localStorage.getItem('token')
    const [token, setToken] = useState(initialToken)
    const userIsLoggedIn = !!token

    const loginHandler = (token) => {
        localStorage.setItem('token',token)
        setToken(token);
    }

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token')
        localStorage.removeItem('cart')
        localStorage.removeItem('email')
        window.location.reload(false); 
    }

    const email = (email) =>{
        localStorage.setItem('email',email)    
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        email: email
    }
    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext