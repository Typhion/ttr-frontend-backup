import {useQuery} from "@tanstack/react-query";
import {getFriendlistNotInLobby} from "../services/FriendDataService.ts";

export function useFriendlistNotInLobby(lobbyId: string) {
    const {
        isLoading,
        isError,
        data: friendlist,
        refetch
    } = useQuery({
        queryKey: ['friendlistNotInLobby'],
        queryFn: () => getFriendlistNotInLobby(lobbyId)
    });

    return {
        isLoading,
        isError,
        data: friendlist,
        refetch
    };
}
