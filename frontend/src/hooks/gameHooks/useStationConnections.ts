import {useQuery} from "@tanstack/react-query";
import {getStationConnections} from "../../services/PlayerDataService.ts";

export function useStationConnections(stationId: string) {
    const {
        isLoading,
        isError,
        data: connections,
    } = useQuery({
        queryKey: ['station', stationId],
        queryFn: () => getStationConnections(stationId)
    });

    return {
        isLoading,
        isError,
        data: connections,
    };
}
