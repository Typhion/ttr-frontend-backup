import {useMutation} from "@tanstack/react-query";
import {leaveLobby} from "../../services/LobbyDataService.ts";

export function useLeaveLobby() {
    return useMutation({
        mutationFn: ((lobbyId: string) => leaveLobby(lobbyId)),
    });
}
