import {useQuery} from "@tanstack/react-query";
import {getUnlockedAvatars} from "../services/ProfileDataService.ts";

export function useGetUnlockedAvatars() {
    const {
        isLoading,
        isError,
        data: unlockedAvatars,
    } = useQuery({
        queryKey: ['unlockedAvatars'],
        queryFn: () => getUnlockedAvatars()
    });

    return {
        isLoading,
        isError,
        data: unlockedAvatars
    };
}