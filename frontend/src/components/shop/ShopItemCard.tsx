import Button from "@mui/material/Button";
import {Box, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import { ShopItem } from "../../model/Shop.ts";
import { getAvatarImage } from "../../model/Profile.ts";

interface ShopItemCardProps {
    item: ShopItem;
    credits: number;
    onBuy: (itemId: string) => void;
}

export default function ShopItemCard({ item, credits, onBuy }: ShopItemCardProps) {
    const isAffordable = credits >= item.price;
    const cardStyle = {
        backgroundColor: item.owned ? 'grey' : 'inherit',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        height: '100%',
        minHeight: '400px'
    };

    const PriceSection = () => {
        return (
            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px 0' }}>
                <Typography variant="h6" style={{ marginRight: '10px' }}>{item.price}</Typography>
                <img src="/src/assets/images//tickets/ticket.png" alt="Ticket" style={{ width: '50px', height: '50px' }} />
            </Box>
        );
    };

    const ItemContent = () => {
        if (item.avatar) {
            const avatarImage = getAvatarImage(item.avatar?.image);
            return (
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        {item.avatar.name}
                    </Typography>
                    {avatarImage && (
                        <CardMedia
                            component="img"
                            sx={{ minWidth: 100, minHeight: 100, maxWidth: 300, maxHeight: 300, margin: 'auto' }}
                            image={avatarImage}
                            alt={item.avatar.name}
                        />
                    )}
                    <PriceSection />
                </CardContent>
            );
        } else if (item.lobbyBanner) {
            return (
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', ...JSON.parse(item.lobbyBanner.styling) }}>
                    <Typography variant="h5">
                        {item.lobbyBanner.name}
                    </Typography>
                    <PriceSection />
                </CardContent>
            );
        }
        return null;
    };

    return (
        <Card sx={cardStyle}>
            <ItemContent />
            <CardActions sx={{ justifyContent: 'center', mt: 'auto' }}>
                <Button
                    variant="outlined"
                    color={isAffordable ? "primary" : "error"}
                    onClick={() => onBuy(item.avatar?.id || item.lobbyBanner?.id)}
                    disabled={item.owned || !isAffordable}
                >
                    {item.owned ? "Owned" : isAffordable ? "Buy" : "Not Enough Credits"}
                </Button>
            </CardActions>
        </Card>
    );
}