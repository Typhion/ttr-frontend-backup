import {useQuery} from "@tanstack/react-query";
import {getShopCosmetics} from "../../services/ShopDataService.ts";

export function useGetShopCosmetics() {
    const {
        isLoading,
        isError,
        data: shopCosmetics,
        refetch
    } = useQuery({
        queryKey: ['shopCosmetics'],
        queryFn: () => getShopCosmetics()
    });

    return {
        isLoading,
        isError,
        data: shopCosmetics,
        refetch
    };
}