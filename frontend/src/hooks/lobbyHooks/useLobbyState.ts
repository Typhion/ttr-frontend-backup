import {useQuery} from "@tanstack/react-query";
import {getLobbyState} from "../../services/LobbyDataService.ts";
import {useNavigate} from "react-router-dom";
import {AxiosError, HttpStatusCode} from "axios";

export function useLobbyState(uuid: string) {
    const navigate = useNavigate();

    const {
        isLoading,
        isError,
        data: lobbyState,
        refetch,
    } = useQuery({
        queryKey: ['lobbyState', uuid],
        queryFn: async () => {
            try {

                return await getLobbyState(uuid);
            } catch (error) {
                const axiosError = error as AxiosError;

                if (axiosError.response?.status === HttpStatusCode.Unauthorized) {
                    navigate("/");
                    return null
                } else {
                    navigate("/lobby/disbanded");
                    return null
                }
            }
        },
        refetchInterval: 1000 * 3, // Refetches every 3 seconds
        refetchIntervalInBackground: true, // Turn off later so that it doesn't refetch when the tab is not active
        retry: 1
    });

    return {
        isLoading,
        isError,
        data: lobbyState,
        refetch,
    };
}
