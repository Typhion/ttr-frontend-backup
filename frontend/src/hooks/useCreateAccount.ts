import {useMutation} from "@tanstack/react-query";
import {createAccount} from "../services/AuthDataService.ts";

export function useCreateAccount() {
    return useMutation({
        mutationFn: (() => createAccount()),
    });
}
