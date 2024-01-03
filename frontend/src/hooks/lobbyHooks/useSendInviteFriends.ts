import {useMutation} from "@tanstack/react-query";
import {sendInviteFriends} from "../../services/LobbyDataService.ts";
import {InviteFriends} from "../../model/LobbyState.ts";

export function useSendInviteFriends() {
    return useMutation({
        mutationFn: ((inviteFriends: InviteFriends) => sendInviteFriends(inviteFriends))
    });
}
