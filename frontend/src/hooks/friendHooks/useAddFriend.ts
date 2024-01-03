import {useMutation} from "@tanstack/react-query";
import {addFriend} from "../../services/FriendDataService.ts";

export function useAddFriend(OnSucces: () => void, OnError: () => void) {
    return useMutation({
        mutationFn: ((friend: string) => addFriend(friend)),
        onSuccess: () => {
            OnSucces()
        },
        onError: () => {
            OnError()
        }
    });
}