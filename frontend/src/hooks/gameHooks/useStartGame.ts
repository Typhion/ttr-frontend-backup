import {useMutation} from "@tanstack/react-query";
import {StartLobbyDto} from "../../model/LobbyState.ts";
import {startGame} from "../../services/LobbyDataService.ts";

export function useStartGame() {
    return useMutation({
        mutationFn: ((startLobbyDto: StartLobbyDto) => startGame(startLobbyDto)),
    });
}
