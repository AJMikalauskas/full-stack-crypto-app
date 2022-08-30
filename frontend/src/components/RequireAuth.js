import { useLocation, Navigate, Outlet  } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();
    //console.log(auth);

    // If a user/email is authenticated, allow them to the Outlet route requested; else return them to where they can get
        // authenticated or the login form page.
        // state of from location helps to use back arrow in history of pages you went to.
    return(
        auth?.accessToken 
        ? <Outlet /> 
        : <Navigate to="/loggedOutHome" state={{from: location}} replace />
    );
};

export default RequireAuth;