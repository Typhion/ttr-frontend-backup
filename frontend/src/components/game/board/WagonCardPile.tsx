import {Badge, Card, CardMedia} from "@mui/material";
import cardBackImage from '../../../assets/images/card-back.png';
import BlackCard from "../../../assets/images/card-black.png";
import BlueCard from "../../../assets/images/card-blue.png";
import GreenCard from "../../../assets/images/card-green.png";
import OrangeCard from "../../../assets/images/card-orange.png";
import PinkCard from "../../../assets/images/card-pink.png";
import RedCard from "../../../assets/images/card-red.png";
import WhiteCard from "../../../assets/images/card-white.png";
import YellowCard from "../../../assets/images/card-yellow.png";
import JokerCard from "../../../assets/images/card-joker.png";

interface WagonCardPileProps {
    cardCount: number;
    onClick: () => void;
    cardColor?: string;
}

export default function WagonCardPile({cardCount, onClick, cardColor}: WagonCardPileProps) {
    let color;
    if (cardColor === undefined) {
        color = 'back';
    } else {
        color = cardColor.toLowerCase();
    }

    const cardImages: { [key: string]: string } = {
        'black': BlackCard,
        'blue': BlueCard,
        'green': GreenCard,
        'orange': OrangeCard,
        'pink': PinkCard,
        'red': RedCard,
        'white': WhiteCard,
        'yellow': YellowCard,
        'joker': JokerCard,
        'back': cardBackImage
    };

    return (
        <Badge
            badgeContent={cardCount}
            color="primary"
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            sx={{
                margin: 'auto',
                width: '40%'
            }}
            showZero
        >
            <Card onClick={onClick} sx={{cursor: 'pointer' }}>
                <CardMedia
                    component="img"
                    image={cardImages[color]}
                    alt="Card"
                />
            </Card>
        </Badge>
    )
}
