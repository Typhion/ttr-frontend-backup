export type LobbyState = {
    lobbyUsersDto: LobbyUserDto[];
    bannedApplicationUsers: ApplicationUserDto[];
    isPublic: boolean;
    maxSize: number;
    code: string;
    settingDto: SettingDto;
    gameInitDto: GameInitDto;
    isOpen: boolean;
    gameId: string;
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

export type ColorSetting = {
    lobbyId: string;
    color: string;
}

export type GameInitDto = {
    players : PlayerDto[];
    settingDto: SettingDto;
}

export type LobbySettings = {
    lobbyId: string;
    settingDto: SettingDto;
}

export type SettingDto = {
    wagonAmount: number;
    jokerWagonCardAmount: number;
    normalWagonCardCount: number;
    maxSize: number;
}

export type PlayerDto = {
    id: string;
    username: string;
    color: string;
}

export type StartLobbyDto = {
    lobbyId: string;
    gameId: string;
}

export type InviteMail = {
    lobbyId: string;
    email: string;
}

export type InviteFriends = {
    lobbyId: string;
    friendIds: string[];
}
