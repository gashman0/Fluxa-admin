import { useQuery } from "@tanstack/react-query";
import { me } from ".";
import queryKeys from "../query-keys";
import type { MeResponse } from "./types";

export const useMe = () => {
    return useQuery<MeResponse>({
        queryKey: [queryKeys.users.getMe],
        queryFn: me,
        retry: false,
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    });
}