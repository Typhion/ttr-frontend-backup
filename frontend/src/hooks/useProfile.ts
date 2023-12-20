import {useQuery} from "@tanstack/react-query";
import {getProfile} from "../services/ProfileDataService.ts";

export function useProfile(playerId: string | undefined) {
    const {
        isLoading,
        isError,
        data: profile,
        refetch
    } = useQuery({
        queryKey: ['profile', playerId],
        queryFn: () => getProfile(playerId)
    });

    return {
        isLoading,
        isError,
        data: profile,
        refetch
    };
}