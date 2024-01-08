import {useMutation} from "@tanstack/react-query";
import {createLobby} from "../../services/LobbyDataService.ts";

export function useCreateLobby(onSuccess: (uuid: string) => void) {
    return useMutation({
        mutationFn: createLobby,
        onSuccess: (uuid) => {
            onSuccess(uuid);
        }
    });
}
