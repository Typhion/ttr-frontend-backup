import {useMutation} from "@tanstack/react-query";
import {quickPlay} from "../../services/LobbyDataService.ts";

export function useQuickPlay(onSuccess: (uuid: String) => void) {
    return useMutation({
        mutationFn: quickPlay,
        onSuccess: (uuid) => {
            onSuccess(uuid);
        }
    });
}
