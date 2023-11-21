import {Badge, Card, CardMedia} from "@mui/material";
import cardBackImage from '../../../assets/images/card-back.png';

interface WagonCardPileProps {
    cardCount: number;
    onClick: () => void;
}

export default function WagonCardPile({cardCount, onClick}: WagonCardPileProps) {
    return (
        <Badge
            badgeContent={cardCount}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                width: 180,
                margin: 'auto'
            }}
        >
            <Card onClick={onClick} sx={{ width: '100%', cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    image={cardBackImage}
                    alt="Card back"
                />
            </Card>
        </Badge>
    )
}