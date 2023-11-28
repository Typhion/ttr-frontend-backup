export type GameState = {
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
    randomRoutes: RouteCard[];

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

export type City = {
    id: string;
    x: number;
    y: number;
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
}
