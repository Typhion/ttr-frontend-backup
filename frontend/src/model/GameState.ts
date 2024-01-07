export type GameState = {
    gameId: string;
    wagonCardPileSize: number;
    routeCardsPileSize: number;
    faceUpWagonCards: string[];
    turn: number;
    playerTurnIndex: number;
    usedWagonCardPileSize: number;
    lastUsedWagonCard?: string;
    players: PlayerState[];
    privateGameState: PrivateGameState;
    cities: City[];
    connectionTiles: ConnectionTile[];
    connections: Connection[];
    gameIsDone: boolean;
}


export type CurrentPlayer = {
    applicationUserId: string;
    username: string;
    secondsLeft: number;
};

export type PlayerState = {
    score: number;
    wagonAmount: number;
    stationAmount: number;
    color: string;
    username: string;
    applicationUserId: string;
    playerId: string;
};

export type PrivateGameState = {
    wagonCards: {
        [color: string]: number;
    };
    routeCards: RouteCard[];
    tempWagonCards: string[];
    tempRouteCards: TempRouteCard[];
    randomRoutes: RouteCard[];

};

export type RouteCard = {
    routeId: string;
    beginCity: string;
    endCity: string;
    connectionSize: number;
    isCompleted: boolean;
};

export type TempRouteCard = {
    routeId: string;
    beginCity: string;
    endCity: string;
    connectionSize: number;
};

export type City = {
    id: string;
    x: number;
    y: number;
    hasStation: boolean;
}

export type ConnectionTile = {
    id: string;
    y: number;
    x: number;
    rotation: number;
    isJoker: boolean;
}

export type Connection = {
    id: string;
    wagonColor: string;
    connectionType: string;
    connectionTiles: string[];
    playerColor: string;
}
