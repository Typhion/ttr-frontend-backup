import {useMutation} from "@tanstack/react-query";
import {InviteUsername} from "../../model/LobbyState.ts";
import {sendInviteUsername} from "../../services/LobbyDataService.ts";

export function useSendInviteUsername() {
    return useMutation({
        mutationFn: ((inviteUsername: InviteUsername) => sendInviteUsername(inviteUsername))
    });
}