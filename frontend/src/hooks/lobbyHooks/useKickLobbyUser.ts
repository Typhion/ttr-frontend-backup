import {useMutation} from "@tanstack/react-query";
import {kickLobbyUser} from "../../services/LobbyDataService.ts";

interface kickUserType {
    lobbyId: string,
    userId: string
}

export function useKickLobbyUser() {
    return useMutation({
        mutationFn: ({lobbyId, userId}: kickUserType) => kickLobbyUser(lobbyId, userId)
    });
}
