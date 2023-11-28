import {useMutation} from "@tanstack/react-query";
import {pickConnection} from "../services/PlayerDataService.ts";
import {ConnectionPick} from "../components/game/board/ConnectionDialog.tsx";

export function usePickConnection(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: ((connectionPick: ConnectionPick) => pickConnection(connectionPick)),
            onSuccess: () => {
                onSuccess()
            }
        }
    )
}
