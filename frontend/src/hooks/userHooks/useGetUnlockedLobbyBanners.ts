import {useQuery} from "@tanstack/react-query";
import {getUnlockedLobbyBanners} from "../../services/ProfileDataService.ts";

export function useGetUnlockedLobbyBanners() {
    const {
        isLoading,
        isError,
        data: unlockedLobbyBanners,
    } = useQuery({
        queryKey: ['unlockedLobbyBanners'],
        queryFn: () => getUnlockedLobbyBanners()
    });

    return {
        isLoading,
        isError,
        data: unlockedLobbyBanners
    };
}