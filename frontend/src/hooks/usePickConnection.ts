import {useMutation} from "@tanstack/react-query";
import {pickConnection, PlayerCardsForConnection} from "../services/PlayerDataService.ts";
import {ConnectionPick} from "../components/game/board/ConnectionDialog.tsx";

export function usePickConnection(onSuccess: (data: PlayerCardsForConnection) => void) {
    return useMutation(
        {
            mutationFn: (connectionPick: ConnectionPick) => pickConnection(connectionPick),
            onSuccess: (data) => {
                onSuccess(data);
            }
        }
    );
}
