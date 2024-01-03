import {useMutation} from "@tanstack/react-query";
import {setLobbySettings} from "../../services/LobbyDataService.ts";
import {LobbySettings} from "../../model/LobbyState.ts";

export function useSetLobbySettings()  {
    return useMutation({
        mutationFn: ((lobbySettings: LobbySettings) => setLobbySettings(lobbySettings.lobbyId, lobbySettings.settingDto)),
    });
}
