import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        // Mounted error could result as part of memory leak
        let isMounted = true;
        
        const verifyRefreshToken = async () => {
            try {
                // sends cookie and new accessToken
                await refresh();
            } catch (err) {
                console.error(err);
            }
            finally {
                // No matter if an error or not, finally will always run and set loading to false
                isMounted && setIsLoading(false);
            }
        }

        // Need to persist auth state, call refresh only when reload page or go to different page; not every time or else user would never
            // really be able to exit the page, if no accessToken, call refresh(), else set loading to false.
        !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

        return () => isMounted = false;
        // Unnecessary dependencies
    }, [])

    // To see what's going on with accessToken and loading state whne we replicate going to another page or refreshing the page.
    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    }, [auth?.accessToken,isLoading])

    return (
        //  Outlet represents all child routes/components in side our persist login route, wrap around our protected routes
        
        <>
        { !persist 
            ? <Outlet/> 
            : isLoading 
                ? <p>Loading...</p>
                : <Outlet/>
        }
        </>
    )
}

export default PersistLogin;