import axios from "axios";
import {Friend} from "../model/Friend.ts";
const mantleUrl = import.meta.env.VITE_MANTLE_URL

export const getFriendlist = async (): Promise<Friend[]> => {
    const response = await axios.get<Friend[]>(`${mantleUrl}/applicationUser/friends`);
    return response.data;
}

export const getFriendlistNotInLobby = async (lobbyId: string): Promise<Friend[]> => {
    const response = await axios.get<Friend[]>(`${mantleUrl}/applicationUser/friends/${lobbyId}`);
    return response.data;
}

export const getFriendRequestList = async (): Promise<Friend[]> => {
    const response = await axios.get<Friend[]>(`${mantleUrl}/applicationUser/friends/request`);
    return response.data;
}

export const addFriend = async (friend: string): Promise<void> => {
    await axios.post(`${mantleUrl}/applicationUser/friends/request/${friend}`);
}

export const removeFriend = async (friendId: string): Promise<void> => {
    await axios.post(`${mantleUrl}/applicationUser/friends/remove/${friendId}`);
}

export const acceptFriend = async (friendId: string): Promise<void> => {
    await axios.post(`${mantleUrl}/applicationUser/friends/accept/${friendId}`);
}

export const denyFriend = async (friendId: string): Promise<void> => {
    await axios.post(`${mantleUrl}/applicationUser/friends/decline/${friendId}`);
}
