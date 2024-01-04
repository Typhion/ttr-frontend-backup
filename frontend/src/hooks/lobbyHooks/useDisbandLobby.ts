import {useMutation} from "@tanstack/react-query";
import {disbandLobby} from "../../services/LobbyDataService.ts";

export function useDisbandLobby(onSuccess: () => void) {
    return useMutation({
        mutationFn: ((lobbyId: string) => disbandLobby(lobbyId)),
        onSuccess: () => {
            onSuccess();
        }
    });
}
