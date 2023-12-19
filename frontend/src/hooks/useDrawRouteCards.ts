import {useMutation} from "@tanstack/react-query";
import {drawRouteCards} from "../services/PlayerDataService";
import {ShortRouteCardsDraw} from "../services/PlayerDataService";
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
