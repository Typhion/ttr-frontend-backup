import {useMutation} from "@tanstack/react-query";
import {unbanUser} from "../../services/AdminDataService.ts";

export function useUnbanUser(onSuccess: () => void) {
    return useMutation({
        mutationFn: (userId: string) => unbanUser(userId),
        onSuccess: () => {
            onSuccess();
        }
    });
}