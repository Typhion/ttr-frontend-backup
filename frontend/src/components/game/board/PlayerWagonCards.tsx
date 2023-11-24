import Badge from '@mui/material/Badge';
import {Box, Card, CardMedia, Grid} from "@mui/material";
import BlackCard from "../../../assets/images/card-black.png";
import BlueCard from "../../../assets/images/card-blue.png";
import GreenCard from "../../../assets/images/card-green.png";
import OrangeCard from "../../../assets/images/card-orange.png";
import PinkCard from "../../../assets/images/card-pink.png";
import RedCard from "../../../assets/images/card-red.png";
import WhiteCard from "../../../assets/images/card-white.png";
import YellowCard from "../../../assets/images/card-yellow.png";
import JokerCard from "../../../assets/images/card-joker.png";


interface PlayerWagonCardsProps {
    wagonCards: { [key: string]: number };
    onClick: () => void;
}

const cardImages: { [key: string]: string } = {
    black: BlackCard,
    blue: BlueCard,
    green: GreenCard,
    orange: OrangeCard,
    pink: PinkCard,
    red: RedCard,
    white: WhiteCard,
    yellow: YellowCard,
    joker: JokerCard
};

export default function PlayerWagonCards({wagonCards, onClick}: PlayerWagonCardsProps) {
    return (
        <Grid container spacing={2}>
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
                width: '95%',
                paddingTop: '2rem',
                justifyContent: 'center',
            }}>
                {Object.entries(wagonCards).map(([cardColor, count], index) => {
                    const color = cardColor.toLowerCase();

                    if (count > 0) {
                        return (
                            <div style={{height: '100%'}} key={index}>
                                <Badge
                                    key={index}
                                    badgeContent={count}
                                    color="primary"
                                    overlap={'circular'}
                                    showZero
                                >
                                    <Card
                                        onClick={onClick}
                                        sx={{height: '100%', cursor: 'pointer', transform: 'rotate(90deg)'}}
                                    >
                                        <CardMedia
                                            component="img"
                                            image={cardImages[color]}
                                            alt="FaceUpWagonCard"
                                            style={{height: '100%'}}
                                        />
                                    </Card>
                                </Badge>
                            </div>
                        );
                    }
                })}
            </Box>
        </Grid>
    );
}
