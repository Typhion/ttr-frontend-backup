import {useMutation} from "@tanstack/react-query";
import {pickRandomWagonCard, RandomWagonCardPick} from "../services/PlayerDataService";

export function usePickRandomWagonCard(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: ((randomWagonCardPick: RandomWagonCardPick) => pickRandomWagonCard(randomWagonCardPick)),
            onSuccess: () => {
                onSuccess()
            }
        }
    )
}
