import {useQuery} from "@tanstack/react-query";
import {getScore} from "../../services/GameDataService.ts";
export function useEndGameScore(gameId: string) {
    const {
        isLoading,
        isError,
        data: endGameScore
    } = useQuery({
        queryKey: ['endGameScore'],
        queryFn: () => getScore(gameId),
    });

    return {
        isLoading,
        isError,
        data: endGameScore
    };
}
