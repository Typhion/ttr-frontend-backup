import {useMutation} from "@tanstack/react-query";
import {setPublic} from "../services/LobbyDataService.ts";

export function useSetPublic() {
    return useMutation({
        mutationFn: ((uuid: string) => setPublic(uuid))
    });
}
