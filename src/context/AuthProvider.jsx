import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [editClientsModal, setEditClientsModal] = useState(false);
    const [deleteClientsModal, setDeleteClientsModal] = useState(false);

    return (
        <AuthContext.Provider value={{ auth, setAuth, editClientsModal, setEditClientsModal, deleteClientsModal, setDeleteClientsModal }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;