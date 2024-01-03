import {useMutation} from "@tanstack/react-query";
import {createStation} from "../../services/PlayerDataService.ts";
import {StationCreate} from "../../components/game/board/CreateStationDialog.tsx";

export function useCreateStation(onSuccess: () => void) {
    return useMutation({
        mutationFn: ((stationCreate: StationCreate) => createStation(stationCreate)),
        onSuccess: () => {
            onSuccess();
        }
    });
}