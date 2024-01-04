export type EndGameScore = {
    id: string;
    routeScore: number;
    incompleteRouteScore: number;
    connectionScore: number;
    longestRouteScore: number;
    stationScore: number;
    totalScore: number;
}

export type GameLeaderBoard = {
    id: string;
    place: number;
    name: string;
    color: string;
    score: number;
}
