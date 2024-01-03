import {useQuery} from "@tanstack/react-query";
import {getPlayerAvatar} from "../../services/ProfileDataService.ts";

export function useGetPlayerAvatar(playerId: string) {
    const {
        isLoading,
        isError,
        data: playerAvatar,
    } = useQuery({
        queryKey: ['playerAvatar', playerId],
        queryFn: () => getPlayerAvatar(playerId)
    });

    return {
        isLoading,
        isError,
        data: playerAvatar
    };
}
