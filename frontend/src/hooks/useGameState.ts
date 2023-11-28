import {useQuery} from "@tanstack/react-query";
import {getGameState} from "../services/GameDataService.ts";

export function useGameState(uuid: string, playerId: string) {
    const {
        isLoading,
        isError,
        data: gameState,
        refetch
    } = useQuery({
        queryKey: ['gameState', uuid, playerId],
        queryFn: () => getGameState(uuid, playerId),
        refetchInterval: 1000 * 3, //Refetches every 3 seconds
        refetchIntervalInBackground: true,//Turn off later so that it doesn't refetch when the tab is not active
    });

    return {
        isLoading,
        isError,
        data: gameState,
        refetch
    };
}
