import {useMutation} from "@tanstack/react-query";
import {EndTurn, endTurn} from "../services/PlayerDataService.ts";

export function useEndTurn(OnSucces: () => void) {
    return useMutation(
        {
            mutationFn: ((endTurnData: EndTurn) => endTurn(endTurnData)),
            onSuccess: () => {
                OnSucces()
            }
        }
    )
}
