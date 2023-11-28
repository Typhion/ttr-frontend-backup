import axios from "axios";
import {ConnectionPick} from "../components/game/board/ConnectionDialog.tsx";

export type RandomWagonCardPick = {
    playerId: string;
    boardId: string;
}
export const pickRandomWagonCard = async (randomWagonCardPick: RandomWagonCardPick): Promise<void> => {
    await axios.post(`/player/pick/wagoncard/random`, randomWagonCardPick);
}

export type FaceUpWagonCardPick = {
    playerId: string;
    boardId: string;
    wagonColor: string;
}
export const pickFaceUpWagonCard = async (faceUpWagonCardPick: FaceUpWagonCardPick): Promise<void> => {
    await axios.post(`/player/pick/wagoncard/faceup`, faceUpWagonCardPick);
}

export type PlayerCardsForConnection = {
    wagonColors: string[] | null;
}

export const getPlayerCardsForConnection = async (connectionId: string, playerId: string): Promise<PlayerCardsForConnection> => {
    console.log(playerId)
    const result = await axios.get(`/player/pick/connection/${connectionId}/player/${playerId}`);
    return result.data;
}

export const pickConnection = async (connectionPick: ConnectionPick): Promise<void> => {
    console.log(connectionPick.playerId)
    await axios.post(`/player/pick/connection`, connectionPick);
}
