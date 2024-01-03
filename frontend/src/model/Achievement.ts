export type Achievement = {
    id: string,
    name: string,
    description: string,
    dateAchieved: string,
    achievementTiers: AchievementTier[]
}

export type AchievementTier = {
    id: string,
    description: string,
    isAchieved: boolean,
    credits: number,
    medal: Medal
}

export enum Medal {
    NONE="NONE",
    BRONZE="BRONZE",
    SILVER="SILVER",
    GOLD="GOLD"
}