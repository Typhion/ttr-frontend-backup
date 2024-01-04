import {useMutation} from "@tanstack/react-query";
import {banUser} from "../../services/AdminDataService.ts";

export function useBanUser(onSuccess: () => void) {
    return useMutation({
        mutationFn: (userId: string) => banUser(userId),
        onSuccess: () => {
            onSuccess();
        }
    });
}