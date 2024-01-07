import {Avatar, LobbyBanner} from "./Profile.ts";

export type ShopItem = {
    owned: boolean;
    price: number;
    avatar: Avatar;
    lobbyBanner: LobbyBanner;
}