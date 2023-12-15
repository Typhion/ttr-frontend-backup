import {ApplicationUserDto} from "./LobbyState.ts";

export type ApplicationUserPageDto = {
    applicationUsers: ApplicationUserDto[];
    totalPages: number;
    totalUsers: number;
}