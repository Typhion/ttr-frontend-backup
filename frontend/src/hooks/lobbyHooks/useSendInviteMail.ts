import {useMutation} from "@tanstack/react-query";
import {sendInviteMail} from "../../services/LobbyDataService.ts";
import {InviteMail} from "../../model/LobbyState.ts";

export function useSendInviteMail() {
    return useMutation({
        mutationFn: ((inviteMail: InviteMail) => sendInviteMail(inviteMail))
    });
}
