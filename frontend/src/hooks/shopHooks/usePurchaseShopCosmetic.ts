import {useMutation} from "@tanstack/react-query";
import {purchaseCosmetic} from "../../services/ShopDataService.ts";

export function usePurchaseShopCosmetic(onSuccess: () => void) {
    return useMutation({
        mutationFn: (id: string) => purchaseCosmetic(id),
        onSuccess: () => onSuccess()
    });
}