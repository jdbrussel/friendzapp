import { useAxiosPublic } from "./useAxios";
import useAuth from './useAuth';

const useRefreshToken = () => {

    const api = useAxiosPublic();

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await api.get('auth/refresh', {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        });
        setAuth(prev => {
            return { ...prev, access_token: response.data.access_token }
        });
        return response.data.access_token;
    }
    return refresh;
};

export default useRefreshToken;
