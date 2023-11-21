import {useQuery} from "@tanstack/react-query";
import {getGameState} from "../services/GameDataService.ts";

export function useGameState(uuid: string) {
    const {
        isLoading,
        isError,
        data: gameState,
    } = useQuery({
        queryKey: ['gameState', uuid],
        queryFn: () => getGameState(uuid)
    });

    return {
        isLoading,
        isError,
        data: gameState,
    };
}