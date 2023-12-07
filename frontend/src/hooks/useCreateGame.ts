import {useMutation} from "@tanstack/react-query";
import {createGame} from "../services/GameDataService.ts";

export function useCreateGame(onSuccess: (uuid: String) => void) {
    return useMutation({
        mutationFn: createGame,
        onSuccess: (uuid) => {
            onSuccess(uuid);
        }
    });
}
