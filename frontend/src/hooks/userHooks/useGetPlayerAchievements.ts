import {useQuery} from "@tanstack/react-query";
import {getPlayerAchievements} from "../../services/ProfileDataService.ts";

export function useGetPlayerAchievements() {
    const {
        isLoading,
        isError,
        data: playerAchievements,
    } = useQuery({
        queryKey: ['playerAchievements'],
        queryFn: () => getPlayerAchievements()
    });

    return {
        isLoading,
        isError,
        data: playerAchievements
    };
}