import {useQuery} from "@tanstack/react-query";
import { getStartedLobbies} from "../../services/LobbyDataService.ts";

export function useStartedLobbies() {
    const {
        isLoading,
        isError,
        data: startedLobbies,
        refetch
    } = useQuery({
        queryKey: ['startedLobbies'],
        queryFn: () => getStartedLobbies()
    });

    return {
        isLoading,
        isError,
        data: startedLobbies,
        refetch
    };
}
