import BlackCard from "../../../assets/images/card-black.png";
import BlueCard from "../../../assets/images/card-blue.png";
import GreenCard from "../../../assets/images/card-green.png";
import OrangeCard from "../../../assets/images/card-orange.png";
import PinkCard from "../../../assets/images/card-pink.png";
import RedCard from "../../../assets/images/card-red.png";
import WhiteCard from "../../../assets/images/card-white.png";
import YellowCard from "../../../assets/images/card-yellow.png";
import JokerCard from "../../../assets/images/card-joker.png";
import {Card, CardMedia} from "@mui/material";

interface FaceUpWagonCardProps {
    cardColor: string;
    onClick: () => void;
}

export default function FaceUpWagonCard({cardColor, onClick}: FaceUpWagonCardProps) {
    const color = cardColor.toLowerCase();

    const cardImages: { [key: string]: string } = {
        'black': BlackCard,
        'blue': BlueCard,
        'green': GreenCard,
        'orange': OrangeCard,
        'pink': PinkCard,
        'red': RedCard,
        'white': WhiteCard,
        'yellow': YellowCard,
        'joker': JokerCard
    };

    if (color in cardImages) {
        return (
            <Card onClick={onClick} sx={{width: '100%', cursor: 'pointer'}}>
                <CardMedia
                    component="img"
                    image={cardImages[color]}
                    alt="FaceUpWagonCard"
                />
            </Card>
        )
    }
}
