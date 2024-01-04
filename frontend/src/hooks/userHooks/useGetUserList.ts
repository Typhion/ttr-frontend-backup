import {useQuery} from "@tanstack/react-query";
import {getUserList, Page} from "../../services/AdminDataService.ts";

export function useGetUserList(page: Page) {
    const {
        isLoading,
        isError,
        data: userPage,
        refetch
    } = useQuery({
        queryKey: ['userList', page],
        queryFn: () => getUserList(page),
    });

    return {
        isLoading,
        isError,
        data: userPage,
        refetch
    };
}