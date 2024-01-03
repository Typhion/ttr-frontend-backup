import {useQuery} from "@tanstack/react-query";
import {getPlayerCardsForStation} from "../../services/PlayerDataService.ts";

export function usePlayerCardsForStation(playerId: string) {
    const {
        isLoading,
        isError,
        data: wagonCards
    } = useQuery({
        queryKey: ['playerCardsForStation', playerId],
        queryFn: () => getPlayerCardsForStation(playerId),
    });

    return {
        isLoading,
        isError,
        data: wagonCards
    };
}