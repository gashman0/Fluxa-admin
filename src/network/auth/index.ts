import api from "../../api/axios";
import routes from "../routes";
import type{ loginPayload, otpPayload } from "./types";

export const login = async (payload: loginPayload) => {
    const response = await api.post(
        routes.auth.login, payload
    );

    return response?.data;
}

export const otp = async(payload: otpPayload) => {
    const response = await api.post(
        routes.auth.otp, payload
    );

    return response?.data;
}