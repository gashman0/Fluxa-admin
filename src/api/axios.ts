import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if(!originalRequest){
            return Promise.reject(error);
        }

        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            originalRequest.url != "/refresh"
        ){
            originalRequest._retry = true;

            try{
                await api.post('/refresh');
            }catch(refreshError){
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;