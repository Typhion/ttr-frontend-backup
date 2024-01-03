import {useMutation} from "@tanstack/react-query";
import {drawRouteCards} from "../../services/PlayerDataService.ts";
import {ShortRouteCardsDraw} from "../../services/PlayerDataService.ts";
export function useDrawRouteCards(OnSucces: () => void) {
    return useMutation(
        {
            mutationFn: ((shortRouteCardsDraw: ShortRouteCardsDraw) => drawRouteCards(shortRouteCardsDraw)),
            onSuccess: () => {
                OnSucces()
            }
        }
    )
}
