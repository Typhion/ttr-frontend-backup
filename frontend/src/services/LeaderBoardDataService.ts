import axios from "axios";
import {LeaderBoardDto} from "../model/LeaderBoard.ts";
const mantleUrl = import.meta.env.VITE_MANTLE_URL

export const getTopLeaderBoard = async (): Promise<LeaderBoardDto[]> => {
    const response = await axios.get<LeaderBoardDto[]>(`${mantleUrl}/leaderboard/top`);
    return response.data;
}

export const getOwnLeaderBoard = async (): Promise<LeaderBoardDto> => {
    const response = await axios.get<LeaderBoardDto>(`${mantleUrl}/leaderboard/self`);
    return response.data;
}
