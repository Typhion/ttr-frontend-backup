export type Profile = {
    id: string;
    username: string;
    stats: ProfileStats;
}

export type ProfileStats = {
    gamesPlayed: number;
    gamesWon: number;
    totalScore: number;
}