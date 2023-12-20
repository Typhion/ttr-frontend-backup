import axios from "axios";
import {Avatar, Profile} from "../model/Profile.ts";
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

export const getUnlockedAvatars = async (): Promise<Avatar[]> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/profile/unlockedAvatars`);
    return result.data;
}

export const changeAvatar = async (avatarId: string): Promise<void> => {
    await axios.patch(`${mantleUrl}/applicationUser/profile/avatar/${avatarId}`);
}