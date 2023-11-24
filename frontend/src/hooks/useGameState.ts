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
    });

    return {
        isLoading,
        isError,
        data: gameState,
        refetch
    };
}
