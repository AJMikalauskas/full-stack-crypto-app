import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

// Allows for us to not have to dd these imports and use in this way, instead can just use useAuth()
    // in files such as Login.js
const useAuth = () => {
    const { auth } = useContext(AuthContext);
    useDebugValue(auth, auth => auth?.email ? "Logged In" : "Logged Out")
    return useContext(AuthContext);
}

export default useAuth;