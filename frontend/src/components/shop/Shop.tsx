import {useGetShopCosmetics} from "../../hooks/shopHooks/useGetShopCosmetics.ts";
import Loader from "../general/Loader.tsx";
import {Alert, Grid} from "@mui/material";
import {useGetUserCredits} from "../../hooks/userHooks/useGetUserCredits.ts";
import ShopItemCard from "./ShopItemCard.tsx";
import {usePurchaseShopCosmetic} from "../../hooks/shopHooks/usePurchaseShopCosmetic.ts";


export default function Shop() {
    const { isLoading, isError, data: shopCosmetics, refetch } = useGetShopCosmetics();
    const { isLoading: isLoadingCredits, isError: isErrorCredits, data: credits, refetch: refetchCredits } = useGetUserCredits();
    const purchaseItem = usePurchaseShopCosmetic(
        () => {
            refetch();
            refetchCredits();
        });

    if (isLoading || isLoadingCredits) return <Loader>Loading shop...</Loader>;

    if (isError || isErrorCredits || !shopCosmetics || !credits) {
        return <Alert severity="error">Unable to load shop.</Alert>;
    }

    const handleBuy = (itemId: string) => {
        purchaseItem.mutate(itemId);
    };

    return (
        <Grid container spacing={2} p={5}>
            {shopCosmetics.map((item) => (
                <Grid item xs={12} md={3} lg={2} key={item.avatar?.id || item.lobbyBanner?.id}>
                    <ShopItemCard item={item} credits={credits} onBuy={handleBuy} />
                </Grid>
            ))}
        </Grid>
    );
}