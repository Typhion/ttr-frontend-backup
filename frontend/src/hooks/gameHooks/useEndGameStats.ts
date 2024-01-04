import {useQuery} from "@tanstack/react-query";
import {getGameStats} from "../../services/GameDataService.ts";
export function useEndGameStats(gameId: string) {
    const {
        isLoading,
        isError,
        data: endGameStats
    } = useQuery({
        queryKey: ['endGameStats'],
        queryFn: () => getGameStats(gameId),
    });

    return {
        isLoading,
        isError,
        data: endGameStats
    };
}
