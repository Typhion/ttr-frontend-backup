import {useMutation} from "@tanstack/react-query";
import {pickFaceUpWagonCard, FaceUpWagonCardPick} from "../../services/PlayerDataService.ts";

export function usePickFaceUpWagonCard(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: ((faceUpWagonCardPick: FaceUpWagonCardPick) => pickFaceUpWagonCard(faceUpWagonCardPick)),
            onSuccess: () => {
                onSuccess()
            }
        }
    )
}
