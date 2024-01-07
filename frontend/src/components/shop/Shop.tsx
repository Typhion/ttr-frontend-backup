import {useGetShopCosmetics} from "../../hooks/shopHooks/useGetShopCosmetics.ts";
import Loader from "../general/Loader.tsx";
import {Alert, Grid} from "@mui/material";
import {useGetUserCredits} from "../../hooks/userHooks/useGetUserCredits.ts";
import ShopItemCard from "./ShopItemCard.tsx";


export default function Shop() {
    const { isLoading, isError, data: shopCosmetics } = useGetShopCosmetics();
    const { isLoading: isLoadingCredits, isError: isErrorCredits, data: credits } = useGetUserCredits();

    if (isLoading || isLoadingCredits) return <Loader>Loading shop...</Loader>;

    if (isError || isErrorCredits || !shopCosmetics || !credits) {
        return <Alert severity="error">Unable to load shop.</Alert>;
    }

    const handleBuy = (itemId: string) => {
        console.log(itemId);
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