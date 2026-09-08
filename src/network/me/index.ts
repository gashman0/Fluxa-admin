import api from "../../api/axios";
import routes from "../routes";

export const me = async () => {
    try{
        const response = await api.get(routes.dashboard.me);
        return response.data;
    }catch(error){
        throw error;
    }
}