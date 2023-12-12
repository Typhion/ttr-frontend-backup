import {useMutation} from "@tanstack/react-query";
import {removeFriend} from "../services/FriendDataService.ts";

export function useRemoveFriend(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: (friendId: string) => removeFriend(friendId),
            onSuccess: () => {
                onSuccess();
            }
        }
    );
}