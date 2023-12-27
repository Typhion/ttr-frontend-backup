import {useMutation} from "@tanstack/react-query";
import {acceptFriend} from "../../services/FriendDataService.ts";

export function useAcceptFriend(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: (friendId: string) => acceptFriend(friendId),
            onSuccess: () => {
                onSuccess();
            }
        }
    );
}