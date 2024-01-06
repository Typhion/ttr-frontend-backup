import {useMutation} from "@tanstack/react-query";
import {changeLobbyBanner} from "../../services/ProfileDataService.ts";

export function useChangeLobbyBanner(onSuccess: () => void) {
    return useMutation(
        {
            mutationFn: (lobbyBannerId: string) => changeLobbyBanner(lobbyBannerId),
            onSuccess: () => {
                onSuccess();
            }
        }
    );
}