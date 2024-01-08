import {useMutation} from "@tanstack/react-query";
import {
    pickStationConnection,
    StationConnection
} from "../../services/PlayerDataService.ts";

export function usePickStationConnection() {
    return useMutation({
        mutationFn: ((stationConnection: StationConnection) => pickStationConnection(stationConnection)),
    });
}
