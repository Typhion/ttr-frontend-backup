import {useQuery} from "@tanstack/react-query";
import {getMatchHistory, MatchHistoryPage} from "../../services/ProfileDataService.ts";

export function useGetMatchHistory(matchHistoryPage: MatchHistoryPage) {
    const {
        isLoading,
        isError,
        data: matchHistory
    } = useQuery({
        queryKey: ['matchHistory', matchHistoryPage],
        queryFn: () => getMatchHistory(matchHistoryPage),
        keepPreviousData: true,
    });

    return {
        isLoading,
        isError,
        data: matchHistory
    };
}
