import axios from "axios";
import {ConnectionPick} from "../components/game/board/ConnectionDialog.tsx";
import {StationCreate} from "../components/game/board/CreateStationDialog.tsx";

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

export type PlayerCardsForStations = {
    wagonCards: string[] | null;
}

export const getPlayerCardsForStation = async (playerId: string): Promise<PlayerCardsForStations> => {
    console.log(playerId)
    const result = await axios.get(`/player/create/station/player/${playerId}`);
    return result.data;
}

export const createStation = async (stationCreate: StationCreate): Promise<void> => {
    await axios.post(`/player/create/station`, stationCreate);
}

export type RouteCardPick = {
    playerId: string;
    boardId: string;
    routeIds: string[];

}

export const pickRouteCard = async (routeCardPick: RouteCardPick): Promise<void> => {
    await axios.post(`/player/pick/routes`, routeCardPick);
}

export type ShortRouteCardsDraw = {
    playerId: string;
    boardId: string;
}

export const drawRouteCards = async (drawRouteCards: ShortRouteCardsDraw): Promise<void> => {
    await axios.post(`/player/draw/routes`, drawRouteCards);
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
