import {useMutation} from "@tanstack/react-query";
import {joinLobby} from "../../services/LobbyDataService.ts";

export function useJoinLobby(onSuccess: (uuid: string) => void) {
    return useMutation({
        mutationFn: ((code: string) => joinLobby(code)),
        onSuccess: (uuid) => {
            onSuccess(uuid);
        }
    });
}
