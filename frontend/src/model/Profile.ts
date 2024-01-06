import AvatarBlue from "../assets/images/avatars/bluepfp.png";
import AvatarGreen from "../assets/images/avatars/greenpfp.png";
import AvatarPurple from "../assets/images/avatars/purplepfp.png";
import AvatarRed from "../assets/images/avatars/redpfp.png";
import AvatarYellow from "../assets/images/avatars/yellowpfp.png";


interface AvatarImages {
    [key: string]: string;
}

const avatarImages: AvatarImages = {
    bluepfp: AvatarBlue,
    greenpfp: AvatarGreen,
    purplepfp: AvatarPurple,
    redpfp: AvatarRed,
    yellowpfp: AvatarYellow,
};

export type Profile = {
    id: string;
    username: string;
    stats: ProfileStats;
    avatar: Avatar;
    lobbyBanner: LobbyBanner;
}

export type ProfileStats = {
    gamesPlayed: number;
    gamesWon: number;
    totalScore: number;
}

export type Avatar = {
    id: string;
    name: string;
    image: string;
}

export type LobbyBanner = {
    id: string;
    name: string;
    styling: string;
}

export type MatchHistory = {
    id: string;
    applicationUser: EndGamePlayerDto;
    gameWon: boolean;
    score: number;
    date: string;
    opponents: EndGameOpponentDto[];

}

export type EndGamePlayerDto = {
    username: string;
    score: number;
    isGameWinner: boolean;
}

export type EndGameOpponentDto = {
    id: string;
    applicationUser: EndGamePlayerDto;
    score: number;
    isGameWinner: boolean;
}

export function getAvatarImage(imageId: string | undefined): string | null {
    if (imageId === undefined) {
        return null;
    }
    return avatarImages[imageId];
}
