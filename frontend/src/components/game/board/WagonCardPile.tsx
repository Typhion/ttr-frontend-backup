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
        >
            <Card onClick={onClick} sx={{ width: '100%', cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={cardBackImage}
                    alt="Card back"
                />
            </Card>
        </Badge>
    )
}