import {useQuery} from "@tanstack/react-query";
import {getStationForCity} from "../../services/PlayerDataService.ts";

export function useStationForCity(cityId: string) {
    const {
        isError,
        isLoading,
        data: station,
        refetch
    } = useQuery({
        queryKey: ['station', cityId, 'city'],
        queryFn: () => getStationForCity(cityId)
    });

    return {
        isError: isError,
        isLoading: isLoading,
        data: station,
        refetch
    };
}
