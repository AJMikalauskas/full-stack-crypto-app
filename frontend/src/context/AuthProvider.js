import { createContext, useState } from "react";

const AuthContext = createContext({}); 

// Difference in context and its provider; export both though.
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    // This is to handle the second security issue, will always persist login
        // This "Trust This Device" Option will give the user an option 
        // whether or not to persist their login or not
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false)

    return (
        // Value expects an object, uses ES6 same name property as value here.
        <AuthContext.Provider value={{auth, setAuth, persist, setPersist}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;