export type GameState = {
    wagonCardPileSize: number;
    faceUpWagonCards: string[];
    turn: number;
    playerTurnIndex: number;
    usedWagonCardPileSize: number;
    lastUsedWagonCard?: string;
    players: PlayerState[];
}

export type PlayerState = {
    score: number;
    wagonAmount: number;
    stationAmount: number;
}
