import Badge from '@mui/material/Badge';
import {alpha, Box, Card, CardMedia, Grid, Popper, Typography, useTheme} from "@mui/material";
import CardImages from "../../../assets/images/cards/index.ts";

import {useRef} from "react";


interface PlayerWagonCardsProps {
    wagonCards: { [key: string]: number };
    tempWagonCards?: string[];
    onClick: () => void;
}

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
                        image={CardImages[color]}
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
                                    sx={{cursor: 'default', transform: 'rotate(90deg)', width: '14vh'}}
                                >
                                    <CardMedia
                                        component="img"
                                        image={CardImages[color]}
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
