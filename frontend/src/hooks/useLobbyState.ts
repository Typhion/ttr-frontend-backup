import {useQuery} from "@tanstack/react-query";
import {getLobbyState} from "../services/LobbyDataService.ts";

export function useLobbyState(uuid: string) {
    const {
        isLoading,
        isError,
        data: lobbyState,
        refetch
    } = useQuery({
        queryKey: ['lobbyState', uuid],
        queryFn: () => getLobbyState(uuid),
        refetchInterval: 1000 * 3, //Refetches every 3 seconds
        refetchIntervalInBackground: true, //Turn off later so that it doesn't refetch when the tab is not active
    });

    return {
        isLoading,
        isError,
        data: lobbyState,
        refetch
    };
}
