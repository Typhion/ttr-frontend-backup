import {useQuery} from "@tanstack/react-query";
import {getCurrentPlayer} from "../../services/GameDataService.ts";

export function useCurrentPlayer(uuid: string) {
    const {
        isLoading,
        isError,
        data: currentPlayer
    } = useQuery({
        queryKey: ['currentPlayer', uuid],
        queryFn: () => getCurrentPlayer(uuid),
        refetchInterval: 1000 * 10, //Refetches every 3 seconds
        refetchIntervalInBackground: true, //Turn off later so that it doesn't refetch when the tab is not active
    });

    return {
        isLoading,
        isError,
        data: currentPlayer
    };
}
