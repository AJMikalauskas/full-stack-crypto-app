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
        // Error with accessing prev value of auth, need to figure out and add later
        setAuth({ email: response.data.email ,password: response.data.password, roles: response.data.roles, accessToken: response.data.accessToken });
        // retries request after accessToken expires from previous request.
        return response.data.accessToken;
    }
    // Custom hook allows you to return anything, normally not JSX
    return refresh;
};

export default useRefreshToken;