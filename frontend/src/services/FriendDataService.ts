import axios from "axios";
import {Friend} from "../model/Friend.ts";
const mantleUrl = import.meta.env.VITE_MANTLE_URL

export const getFriendlist = async (): Promise<Friend[]> => {
    const response = await axios.get<Friend[]>(`${mantleUrl}/applicationUser/friends`);
    return response.data;
}