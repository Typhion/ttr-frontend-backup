import {useQuery} from "@tanstack/react-query";
import {getBoardImage} from "../services/BoardDataService.ts";

export function useBoardImage(uuid: string) {
    const {
        isLoading,
        isError,
        data: game,
    } = useQuery({
        queryKey: ['board', uuid],
        queryFn: () => getBoardImage(uuid)
    });

    return {
        isLoading,
        isError,
        data: game,
    };
}