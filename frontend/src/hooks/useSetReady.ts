import {useMutation} from "@tanstack/react-query";
import {setReady} from "../services/LobbyDataService.ts";

export function useSetReady() {
    return useMutation({
        mutationFn: ((uuid: string) => setReady(uuid))
    });
}
