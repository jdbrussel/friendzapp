import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [login, setLogin] = useState(false);
    const [user, setUser] = useState({});

    return (
        <AuthContext.Provider value={{ login, setLogin, user, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;