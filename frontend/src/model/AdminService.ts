export type ApplicationUserPageDto = {
    applicationUsers: ApplicationUserListDto[];
    totalPages: number;
    totalUsers: number;
}

export type ApplicationUserListDto = {
    id: string;
    username: string;
    email: string;
    isBanned: boolean;
}