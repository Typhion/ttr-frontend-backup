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

export type EndGameStats = {
    UUID: string;
    longestRoute: number;
    completedRoutes: number;
    completedTrains: number;
    completedFerries: number;
    completedTunnels: number;

}
