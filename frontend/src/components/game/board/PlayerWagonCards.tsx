import Badge from '@mui/material/Badge';
import {alpha, Box, Card, CardMedia, Grid, Popper, Typography, useTheme} from "@mui/material";
import BlackCard from "../../../assets/images/card-black.png";
import BlueCard from "../../../assets/images/card-blue.png";
import GreenCard from "../../../assets/images/card-green.png";
import OrangeCard from "../../../assets/images/card-orange.png";
import PinkCard from "../../../assets/images/card-pink.png";
import RedCard from "../../../assets/images/card-red.png";
import WhiteCard from "../../../assets/images/card-white.png";
import YellowCard from "../../../assets/images/card-yellow.png";
import JokerCard from "../../../assets/images/card-joker.png";
import {useRef} from "react";


interface PlayerWagonCardsProps {
    wagonCards: { [key: string]: number };
    tempWagonCards?: string[];
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

export default function PlayerWagonCards({wagonCards, tempWagonCards, onClick}: PlayerWagonCardsProps) {
    const theme = useTheme();
    const anchorEl = useRef(null);

    const renderTooltip = () => {
        if (tempWagonCards && tempWagonCards.length === 1) {
            const color = tempWagonCards[0].toLowerCase();
            return (
                <Popper
                    open
                    anchorEl={anchorEl.current}
                    placement="top"
                    style={{
                        width: '20vw',
                        height: '20vh',
                        backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: theme.shape.borderRadius,
                }}
                    modifiers={[
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 0],
                            },
                        },
                    ]}
                >
                    <Typography variant="subtitle1" style={{ marginBottom: '1vh' }}>
                        Picked Wagon Card
                    </Typography>
                    <CardMedia
                        component="img"
                        image={cardImages[color]}
                        alt={`${color} card`}
                        style={{ width: '50%', height: 'auto' }}
                    />
                </Popper>
            );
        }
    };

    return (
        <Grid container spacing={2} ref={anchorEl}>
            {renderTooltip()}
            <Box style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 'auto',
                width: '95%',
                paddingTop: '8vh',
                justifyContent: 'center',
            }}>
                {Object.entries(wagonCards).map(([cardColor, count], index) => {
                    const color = cardColor.toLowerCase();

                    if (count > 0) {
                        return (
                            <Badge
                                key={index}
                                badgeContent={count}
                                color="primary"
                                overlap={'circular'}
                                showZero
                            >
                                <Card
                                    onClick={onClick}
                                    sx={{cursor: 'pointer', transform: 'rotate(90deg)', width: '14vh'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={cardImages[color]}
                                        alt="FaceUpWagonCard"
                                        style={{width: '100%'}}
                                    />
                                </Card>
                            </Badge>
                        );
                    }
                })}
            </Box>
        </Grid>
    );
}
