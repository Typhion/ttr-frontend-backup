import {useQuery} from "@tanstack/react-query";
import {getStationForCityAndPlayer, getStationForCityAndPlayerProps} from "../../services/PlayerDataService.ts";

export function useStationForCityAndPlayer(cityAndPlayerProps: getStationForCityAndPlayerProps) {
    const {
        isError,
        isLoading,
        data: station,
        refetch
    } = useQuery({
        queryKey: ['station', cityAndPlayerProps],
        queryFn: () => getStationForCityAndPlayer(cityAndPlayerProps)
    });

    return {
        isError: isError,
        isLoading: isLoading,
        data: station,
        refetch
    };
}