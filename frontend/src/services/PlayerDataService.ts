import axios from "axios";
import {ConnectionPick} from "../components/game/board/ConnectionDialog.tsx";
import {StationCreate} from "../components/game/board/CreateStationDialog.tsx";
import {ConnectionForStation, Station} from "../model/GameState.ts";

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
    const result = await axios.get(`/station/create/station/player/${playerId}`);
    return result.data;
}

export const createStation = async (stationCreate: StationCreate): Promise<void> => {
    await axios.post(`/station/create/station`, stationCreate);
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
    message: string | null;
}

export const getPlayerCardsForConnection = async (connectionId: string, playerId: string): Promise<PlayerCardsForConnection> => {
    const result = await axios.get(`/player/pick/connection/${connectionId}/player/${playerId}`);
    return result.data;
}

export const pickConnection = async (connectionPick: ConnectionPick): Promise<PlayerCardsForConnection> => {
    const result = await axios.post(`/player/pick/connection`, connectionPick);
    return result.data;
}

export type EndTurn = {
    gameId: string;
    playerId: string;
}

export const endTurn = async (endTurn: EndTurn): Promise<void> => {
    await axios.post(`/turn/end/${endTurn.gameId}/player/${endTurn.playerId}`);
}

export type StationConnection = {
    stationId: string;
    connectionId: string;
    boardId: string;
    playerId: string;
}

export const pickStationConnection = async (stationConnection : StationConnection): Promise<void> => {
    const result = await axios.post(`/station/pick/connection`, stationConnection);
    return result.data;
}

export const getStationConnections = async (stationId: string): Promise<ConnectionForStation[]> => {
    if (!stationId) return Promise.resolve([]);
    const result = await axios.get<ConnectionForStation[]>(`/station/${stationId}/connections`);
    return result.data;
}

export type getStationForCityAndPlayerProps = {
    cityId: string,
    playerId: string
}

export const getStationForCityAndPlayer = async ({cityId, playerId}: getStationForCityAndPlayerProps): Promise<Station> => {
    const result = await axios.get<Station>(`/station/city/${cityId}/player/${playerId}`);
    return result.data;
}

export const getStationForCity = async (cityId: string): Promise<Station> => {
    const result = await axios.get<Station>(`/station/city/${cityId}`);
    return result.data;
}


export type StationWithColor= {
    stationId: string,
    gamePlayerColor: string,
}
export const getOwnerColorByStation = async (stationId: string | null) : Promise<StationWithColor> => {
    const result = await axios.get<StationWithColor>(`/station/${stationId}/owner`);
    return result.data;
}
