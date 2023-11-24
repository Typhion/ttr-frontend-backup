import {useMutation} from "@tanstack/react-query";
import {pickFaceUpWagonCard, FaceUpWagonCardPick} from "../services/PlayerDataService";

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
