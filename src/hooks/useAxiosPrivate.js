import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

// used for adding interceptors to the this axiosPrivate requests/instances
const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const {auth} = useAuth();

    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // If the Authorization header with accessToken doesn't exist, then we know it's not a retry, know it's the 1st attempt
                if(!config.headers['Authorization'])
                {
                    // From the auth accessToken, could be from when we logged in or already refreshed via this
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`
                }
                return config;
                // error handling, reject Promise with apram or error
            }, (error) => Promise.reject(error)
        );

        // vanilla js event listeners like the interceptors, need to be removed and attached at specific points
            // we are expecting an error such that the accessToken has expired
        const responseIntercept = axiosPrivate.interceptors.response.use(
            // if response is good return response, else, handle error via async function
            response => response,
            async(error) => {
                // get previous request
                const prevRequest = error?.config;
                // request failed due to expired accessToken(403 error) and custom property of sent isn't truthy --> sent is to only retry refresh route 
                    // 1 time, not endless loop
                if(error?.response?.status === 403 && !prevRequest?.sent)
                {
                    // this is for original sent, only retry request 1 time.
                    prevRequest.sent = true;
                    // get new accessToken by calling this refresh api route; Change authorization header to new accessToken with Bearer Auth
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }  
                // if skips ib block above, reject the Request/Promise
                return Promise.reject(error)
            }
        );
        // cleanup function for unneccessary interceptors, both of request and response
        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    // returns axiosPrivate instance, will have added or attached interceptors to the returned instance 
    return axiosPrivate;
}

export default useAxiosPrivate;