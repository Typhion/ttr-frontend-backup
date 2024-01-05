import {useQuery} from "@tanstack/react-query";
import {getMatchHistory} from "../../services/ProfileDataService.ts";

export function useGetMatchHistory() {
    const {
        isLoading,
        isError,
        data: matchHistory,
    } = useQuery({
        queryKey: ['matchHistory'],
        queryFn: () => getMatchHistory()
    });

    return {
        isLoading,
        isError,
        data: matchHistory
    };
}
