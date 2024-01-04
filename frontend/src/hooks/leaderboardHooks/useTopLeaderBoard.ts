import {useQuery} from "@tanstack/react-query";
import {getTopLeaderBoard} from "../../services/LeaderBoardDataService.ts";

export function useTopLeaderBoard() {
    const {
        isLoading,
        isError,
        data: topLeaderBoard
    } = useQuery({
        queryKey: ['topLeaderBoard'],
        queryFn: () => getTopLeaderBoard()
    });

    return {
        isLoading,
        isError,
        data: topLeaderBoard
    };
}
