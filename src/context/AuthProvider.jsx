import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [clientId, setClientId] = useState({});

    return (
        <AuthContext.Provider value={{ auth, setAuth, clientId, setClientId }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;