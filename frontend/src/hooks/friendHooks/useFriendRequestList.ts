import {useQuery} from "@tanstack/react-query";
import {getFriendRequestList} from "../../services/FriendDataService.ts";

export function useFriendRequestList() {
    const {
        isLoading,
        isError,
        data: friendrequestlist,
        refetch
    } = useQuery({
        queryKey: ['friendrequestlist'], //TODO: not sure about this
        queryFn: () => getFriendRequestList()
    });

    return {
        isLoading,
        isError,
        data: friendrequestlist,
        refetch
    };
}