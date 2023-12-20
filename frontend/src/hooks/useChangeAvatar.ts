import {useMutation} from "@tanstack/react-query";
import {changeAvatar} from "../services/ProfileDataService.ts";

export function useChangeAvatar(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: (avatarId: string) => changeAvatar(avatarId),
            onSuccess: () => {
                onSuccess();
            }
        }
    );
}