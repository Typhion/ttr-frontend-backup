import {Game} from "../model/Game.ts";
import axios from "axios";
import {GameState} from "../model/GameState.ts";
import {GameInitDto} from "../model/LobbyState.ts";
import {EndGameScore, GameLeaderBoard} from "../model/EndGame.ts";

export const getGame = async (uuid: string): Promise<Game> => {
    const response = await axios.get<Game>(`/game/${uuid}`);
    return response.data;
}

export const getGameState = async (uuid: string, playerId: string): Promise<GameState> => {
    const response = await axios.get<GameState>(`/game/${uuid}/state/${playerId}`);
    return response.data;
}

export const createGame = async (gameInitDto: GameInitDto): Promise<string> => {
    const result = await axios.post(`/game/init`, gameInitDto);
    return result.data;
}

export const getScore = async (gameId: string): Promise<EndGameScore> => {
    const response = await axios.get<EndGameScore>(`/game/score/${gameId}`);
    return response.data;
}

export const getGameLeaderBoard = async (gameId: string): Promise<GameLeaderBoard[]> => {
    const response = await axios.get<GameLeaderBoard[]>(`/game/leaderBoard/${gameId}`);
    return response.data;
}
