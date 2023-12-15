import {useMutation} from "@tanstack/react-query";
import {createGame} from "../services/GameDataService.ts";
import {GameInitDto} from "../model/LobbyState.ts";

export function useCreateGame(onSuccess: (uuid: String) => void) {
    return useMutation({
        mutationFn: ((gameInitDto: GameInitDto) => createGame(gameInitDto)),
        onSuccess: (uuid) => {
            onSuccess(uuid);
        }
    });
}
