import axios from "axios";
import {LobbyState} from "../model/LobbyState.ts";

const mantleUrl = import.meta.env.VITE_MANTLE_URL
export const createLobby = async (): Promise<string> => {
    const result = await axios.post(`${mantleUrl}/lobby/create`);
    return result.data;
}

export const joinLobby = async (code: string): Promise<String> => {
    const result = await axios.post(`${mantleUrl}/lobby/join/${code}`);
    return result.data;
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

export const getPublicLobbies = async (): Promise<LobbyState[]> => {
    const response = await axios.get<LobbyState[]>(`${mantleUrl}/lobby/available`);
    return response.data;
}

export const getLobbyState = async (uuid: string): Promise<LobbyState> => {
    const response = await axios.get<LobbyState>(`${mantleUrl}/lobby/${uuid}/state`);
    return response.data;
}
