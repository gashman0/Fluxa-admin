import { useNavigate } from "react-router-dom";
import { login } from ".";
// import queryKeys from "../query-keys";
import type { loginPayload } from "./types";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
    const navigate = useNavigate();
    // const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: loginPayload) => login(payload),

        onSuccess: async () => {
            // await queryClient.refetchQueries({
            //     queryKey: [queryKeys.users.getMe],
            // });

            navigate('/otp');
        },
    });
};