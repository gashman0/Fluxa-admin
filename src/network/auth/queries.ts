import { useNavigate } from "react-router-dom";
import { login, otp, logout } from ".";
import queryKeys from "../query-keys";
import type { loginPayload, otpPayload } from "./types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (payload: loginPayload) => login(payload),

        onSuccess: async (data) => {

            navigate('/otp', {
                state: {adminId: data.adminId,}
            });
        },
    });
};

export const useOtp = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: otpPayload) => otp(payload),

        onSuccess: async () => {
            await queryClient.refetchQueries({
                queryKey: [queryKeys.users.getMe]
            });

            navigate('/dashboard')
        }
    });
};

export const useLogout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => logout(),
        onSuccess: () => {
            queryClient.setQueryData([queryKeys.users.getMe], null);

            navigate("/");
        }
    })
}