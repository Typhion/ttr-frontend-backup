import axios from "axios";

export type RandomWagonCardPick = {
    playerId: string;
    boardId: string;
}
export const pickRandomWagonCard = async (randomWagonCardPick: RandomWagonCardPick): Promise<void> => {
    console.log("pickRandomWagonCard")
    await axios.post(`/player/pick/wagoncard/random`, randomWagonCardPick);
}
