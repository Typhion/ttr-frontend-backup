export type LobbyState = {
    lobbyUsersDto: LobbyUserDto[];
    isPublic: boolean;
    maxSize: number;
}

export type LobbyUserDto = {
    id: string;
    applicationUserDto: ApplicationUserDto;
    color: string;
    ready: boolean;
    isHost: boolean;
}

export type ApplicationUserDto = {
    id: string;
    username: string;
    email: string;
}
