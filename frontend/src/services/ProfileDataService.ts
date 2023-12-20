import axios from "axios";
import {Profile} from "../model/Profile.ts";
const mantleUrl = import.meta.env.VITE_MANTLE_URL

export const getProfile = async (playerId: string | undefined): Promise<Profile> => {
    let result;
    if (!playerId || playerId === "") {
        result = await axios.get(`${mantleUrl}/applicationUser/profile`);
    } else {
        result = await axios.get(`${mantleUrl}/applicationUser/profile/${playerId}`);
    }
    return result.data;
}