import {useQuery} from "@tanstack/react-query";
import {getPublicLobbies} from "../services/LobbyDataService.ts";

export function usePublicLobbies() {
    const {
        isLoading,
        isError,
        data: publicLobbies,
        refetch
    } = useQuery({
        queryKey: ['publicLobbies'],
        queryFn: () => getPublicLobbies()
    });

    return {
        isLoading,
        isError,
        data: publicLobbies,
        refetch
    };
}
