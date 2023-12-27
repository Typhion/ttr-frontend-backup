import {useQuery} from "@tanstack/react-query";
import {getGame} from "../../services/GameDataService.ts";

export function useGame(uuid: string) {
    const {
        isLoading,
        isError,
        data: game,
    } = useQuery({
        queryKey: ['game', uuid],
        queryFn: () => getGame(uuid)
    });

    return {
        isLoading,
        isError,
        data: game,
    };
}