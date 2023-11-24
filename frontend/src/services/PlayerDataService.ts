import axios from "axios";

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
