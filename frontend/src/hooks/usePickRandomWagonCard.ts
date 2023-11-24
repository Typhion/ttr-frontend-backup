import {useMutation} from "@tanstack/react-query";
import {pickRandomWagonCard, RandomWagonCardPick} from "../services/PlayerDataService";

export function usePickRandomWagonCard() {
    return useMutation(
        {
            mutationFn: ((randomWagonCardPick: RandomWagonCardPick) => pickRandomWagonCard(randomWagonCardPick))
        }
    )
}
