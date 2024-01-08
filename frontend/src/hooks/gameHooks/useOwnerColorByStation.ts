import {useQuery} from "@tanstack/react-query";
import {getOwnerColorByStation} from "../../services/PlayerDataService.ts";

export function useOwnerColorByStation(stationId: string | null) {
    const {
        isLoading,
        isError,
        data: stationWithColor,
    } = useQuery({
        queryKey: ['stationWithColor', stationId, 'station'],
        queryFn: () => getOwnerColorByStation(stationId)
    });

    return {
        isLoading,
        isError,
        data: stationWithColor,
    };
}
