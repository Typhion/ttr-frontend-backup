import {useMutation} from "@tanstack/react-query";
import {setColor} from "../../services/LobbyDataService.ts";
import {ColorSetting} from "../../model/LobbyState.ts";

export function useSetColor() {
    return useMutation({
        mutationFn: ((colorSetting: ColorSetting) => setColor(colorSetting.lobbyId, colorSetting.color))
    });
}
