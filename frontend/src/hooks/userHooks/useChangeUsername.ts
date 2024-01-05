import {useMutation} from "@tanstack/react-query";
import {changeUsername} from "../../services/ProfileDataService.ts";

export function useChangeUsername(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: (newUsername: string) => changeUsername(newUsername),
            onSuccess: () => {
                onSuccess();
            }
        }
    );
}