import axios from "axios";
import {Avatar, LobbyBanner, MatchHistory, Profile} from "../model/Profile.ts";
import {Achievement} from "../model/Achievement.ts";
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

export const getUnlockedLobbyBanners = async (): Promise<LobbyBanner[]> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/profile/unlockedLobbyBanners`);
    return result.data;
}

export const changeAvatar = async (avatarId: string): Promise<void> => {
    await axios.patch(`${mantleUrl}/applicationUser/profile/avatar/${avatarId}`);
}

export const changeLobbyBanner = async (lobbyBannerId: string): Promise<void> => {
    await axios.patch(`${mantleUrl}/applicationUser/profile/lobbyBanner/${lobbyBannerId}`);
}

export const getPlayerAchievements = async (): Promise<Achievement[]> => {
    const result = await axios.get(`${mantleUrl}/achievement/`);
    return result.data;
}

export const getPlayerAvatar = async (playerId: string): Promise<Avatar> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/profile/${playerId}/avatar`);
    return result.data;
}

export const getPlayerLobbyBanner = async (playerId: string): Promise<LobbyBanner> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/profile/${playerId}/lobbyBanner`);
    return result.data;
}

export const changeUsername = async (newUsername: string): Promise<void> => {
    await axios.patch(`${mantleUrl}/applicationUser/profile/edit/username/${newUsername}`);
}

export const checkIfUsernameExists = async (username: string): Promise<boolean> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/exists/${username}`);
    return result.data;
}

export const getMatchHistory = async (): Promise<MatchHistory[]> => {
    const result = await axios.get(`${mantleUrl}/applicationUser/matchHistory`);
    return result.data;
}
