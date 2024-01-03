import {useMutation} from "@tanstack/react-query";
import {denyFriend} from "../../services/FriendDataService.ts";

export function useDenyFriend(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: (friendId: string) => denyFriend(friendId),
            onSuccess: () => {
                onSuccess();
            }
        }
    );
}