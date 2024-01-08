import {useQuery} from "@tanstack/react-query";
import {getProfileForHeader} from "../../services/ProfileDataService.ts";

export function useProfileForHeader(playerId: string | undefined) {
    const {
        isLoading,
        isError,
        data: profile,
        refetch
    } = useQuery({
        queryKey: ['profileForHeader', playerId],
        queryFn: () => getProfileForHeader(playerId),
        enabled: !!playerId
    });

    return {
        isLoading,
        isError,
        data: profile,
        refetch
    };
}