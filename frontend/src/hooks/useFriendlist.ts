import {useQuery} from "@tanstack/react-query";
import {getFriendlist} from "../services/FriendDataService.ts";

export function useFriendlist() {
    const {
        isLoading,
        isError,
        data: friendlist,
        refetch
    } = useQuery({
        queryKey: ['friendlist'], //TODO: not sure about this
        queryFn: () => getFriendlist()
    });

    return {
        isLoading,
        isError,
        data: friendlist,
        refetch
    };
}