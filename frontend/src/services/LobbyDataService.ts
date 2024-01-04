import axios from "axios";
import {InviteFriends, InviteMail, InviteUsername, LobbyState, SettingDto, StartLobbyDto} from "../model/LobbyState.ts";

const mantleUrl = import.meta.env.VITE_MANTLE_URL
export const createLobby = async (): Promise<string> => {
    const result = await axios.post(`${mantleUrl}/lobby/create`);
    return result.data;
}

export const joinLobby = async (code: string): Promise<string> => {
    const result = await axios.post(`${mantleUrl}/lobby/join/${code}`);
    return result.data;
}

export const quickPlay = async (): Promise<string> => {
    const result = await axios.post(`${mantleUrl}/lobby/join/quickPlay`);
    return result.data;
}

export const leaveLobby = async (lobbyId: string): Promise<void> => {
    await axios.delete(`${mantleUrl}/lobby/leave/${lobbyId}`);
}

export const disbandLobby = async (lobbyId: string): Promise<void> => {
    await axios.delete(`${mantleUrl}/lobby/disband/${lobbyId}`);
}

export const setReady = async (uuid: string): Promise<void> => {
    await axios.patch(`${mantleUrl}/lobbyUser/ready/${uuid}`);
}

export const setColor = async (lobbyId: string, color: string): Promise<void> => {
    const encodedColor = encodeURIComponent(color);
    await axios.patch(`${mantleUrl}/lobbyUser/${lobbyId}/color?color=${encodedColor}`);
}

export const setPublic = async (uuid: string): Promise<void> => {
    await axios.patch(`${mantleUrl}/lobby/public/${uuid}`);
}

export const startGame = async (startLobbyDto: StartLobbyDto): Promise<void> => {
    await axios.patch(`${mantleUrl}/lobby/start/${startLobbyDto.lobbyId}/game/${startLobbyDto.gameId}`);
}

export const getPublicLobbies = async (): Promise<LobbyState[]> => {
    const response = await axios.get<LobbyState[]>(`${mantleUrl}/lobby/available`);
    return response.data;
}

export const getStartedLobbies = async (): Promise<LobbyState[]> => {
    const response = await axios.get<LobbyState[]>(`${mantleUrl}/lobby/started`);
    return response.data;
}

export const getLobbyState = async (uuid: string): Promise<LobbyState> => {
    const response = await axios.get<LobbyState>(`${mantleUrl}/lobby/${uuid}/state`);
    return response.data;
}

export const setLobbySettings = async (lobbyId: string, settingDto: SettingDto): Promise<void> => {
    await axios.put(`${mantleUrl}/lobby/${lobbyId}/setting`, settingDto);
}

export const sendInviteMail = async (inviteMail: InviteMail): Promise<void> => {
    await axios.post(`${mantleUrl}/lobby/${inviteMail.lobbyId}/invite/email/${inviteMail.email}`);
}

export const sendInviteUsername = async (inviteUsername: InviteUsername): Promise<void> => {
    await axios.post(`${mantleUrl}/lobby/${inviteUsername.lobbyId}/invite/username/${inviteUsername.username}`);
}

export const sendInviteFriends = async (inviteFriends: InviteFriends): Promise<void> => {
    await axios.post(`${mantleUrl}/lobby/${inviteFriends.lobbyId}/invite/friends`, inviteFriends.friendIds);
}

export const kickLobbyUser = async (lobbyId: string, userId: string): Promise<void> => {
    await axios.post(`${mantleUrl}/lobbyUser/${lobbyId}/kick/${userId}`)
}

export const banLobbyUser = async (lobbyId: string, userId: string): Promise<void> => {
    await axios.post(`${mantleUrl}/lobbyUser/${lobbyId}/ban/${userId}`)
}

