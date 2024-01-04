import {useQuery} from "@tanstack/react-query";
import {getOwnLeaderBoard} from "../../services/LeaderBoardDataService.ts";

export function useOwnLeaderBoard() {
    const {
        isLoading,
        isError,
        data: ownLeaderBoard
    } = useQuery({
        queryKey: ['ownLeaderBoard'],
        queryFn: () => getOwnLeaderBoard()
    });

    return {
        isLoading,
        isError,
        data: ownLeaderBoard
    };
}
