import {useQuery} from "@tanstack/react-query";
import {getGameLeaderBoard} from "../../services/GameDataService.ts";
export function useEndGameLeaderBoard(gameId: string) {
    const {
        isLoading,
        isError,
        data: endGameLeaderBoard
    } = useQuery({
        queryKey: ['endGameLeaderBoard'],
        queryFn: () => getGameLeaderBoard(gameId),
    });

    return {
        isLoading,
        isError,
        data: endGameLeaderBoard
    };
}
