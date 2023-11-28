import {useQuery} from "@tanstack/react-query";
import {getPlayerCardsForConnection} from "../services/PlayerDataService.ts";

export function usePlayerCardsForConnection(connectionId: string, playerId: string) {
    const {
        isLoading,
        isError,
        data: wagonCards
    } = useQuery({
        queryKey: ['playerCardsForConnection', connectionId, playerId],
        queryFn: () => getPlayerCardsForConnection(connectionId, playerId),
    });

    return {
        isLoading,
        isError,
        data: wagonCards
    };
}
