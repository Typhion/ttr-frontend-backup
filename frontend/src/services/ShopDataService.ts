import axios from "axios";
import {ShopItem} from "../model/Shop.ts";

const mantleUrl = import.meta.env.VITE_MANTLE_URL

export const getShopCosmetics = async (): Promise<ShopItem[]> => {
    const result = await axios.get(`${mantleUrl}/shop/`);
    return result.data;
}