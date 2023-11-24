export type GameState = {
    wagonCardPileSize: number;
    faceUpWagonCards: string[];
    turn: number;
    playerTurnIndex: number;
    usedWagonCardPileSize: number;
    lastUsedWagonCard?: string;
    players: PlayerState[];
    privateGameState: PrivateGameState;
}


export type PlayerState = {
    score: number;
    wagonAmount: number;
    stationAmount: number;
};

export type PrivateGameState = {
    wagonCards: {
        [color: string]: number;
    };
    routeCards: RouteCard[];
    tempWagonCards: string[];
    tempRouteCards: TempRouteCard[];
};

export type RouteCard = {
    routeId: string;
    beginCity: string;
    endCity: string;
    connectionSize: number;
};

export type TempRouteCard = {
    routeId: string;
    beginCity: string;
    endCity: string;
    connectionSize: number;
};
