import {useMutation} from "@tanstack/react-query";
import {banLobbyUser} from "../services/LobbyDataService.ts";

interface banUserType {
    lobbyId: string,
    userId: string
}

export function useBanLobbyUser() {
    return useMutation({
        mutationFn: ({lobbyId, userId}: banUserType) => banLobbyUser(lobbyId, userId)
    });
}
