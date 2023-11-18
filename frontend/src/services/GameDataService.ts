import {Game} from "../model/Game.ts";
import axios from "axios";

export const getGame = async (uuid: string): Promise<Game> => {
    const response = await axios.get<Game>(`/game/${uuid}`);
    return response.data;
}