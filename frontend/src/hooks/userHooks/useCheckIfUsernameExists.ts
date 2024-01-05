import {useQuery} from "@tanstack/react-query";
import {checkIfUsernameExists} from "../../services/ProfileDataService.ts";

export function useCheckIfUsernameExists(username: string) {
    return useQuery(['usernameExists', username], async () => {
        if (!username) {
            return false;
        }
        return await checkIfUsernameExists(username);
    }, {
        enabled: !!username,
    });
}