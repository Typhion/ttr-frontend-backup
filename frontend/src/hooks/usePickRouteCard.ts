import {useMutation} from "@tanstack/react-query";
import {pickRouteCard, RouteCardPick} from "../services/PlayerDataService";

export function usePickRouteCard(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: ((routeCardPick: RouteCardPick) => pickRouteCard(routeCardPick)),
            onSuccess: () => {
                onSuccess()
            }
        }
    )
}
