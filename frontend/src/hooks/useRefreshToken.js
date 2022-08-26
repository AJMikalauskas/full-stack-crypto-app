import axios from '../api/axios';
import useAuth from './useAuth';

// This function will refresh the access token or refresh token and in doing so, give the current user logged in 
    // the ability to see data, allows user to see data that may be blocked due to accessToken/refreshToken blockage
const useRefreshToken = () => {

    const { setAuth } = useAuth();

    // withCredentials set to true allows us to send cookies with our request.
    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => {
            // stringify prev to see the response
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            // setAuth data to what was previously in it + a new accessToken from the request we just made  
                // not sure roles is necessary, as they really will never change with what I'm doing --> roles: response.data.roles, 
            return { ...prev, roles: response.data.roles, accessToken: response.data.accessToken }
        });
        // retries request after accessToken expires from previous request.
        return response.data.accessToken;
    }
    // Custom hook allows you to return anything, normally not JSX
    return refresh;
};

export default useRefreshToken;