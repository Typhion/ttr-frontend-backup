import {Badge, Card, CardMedia, Tooltip} from "@mui/material";
import CardImages from "../../../assets/images/cards/index.ts";

interface WagonCardPileProps {
    cardCount: number;
    onClick: () => void;
    cardColor?: string;
    myTurn?: boolean;
}

export default function WagonCardPile({cardCount, onClick, cardColor, myTurn}: WagonCardPileProps) {
    let color;
    if (cardColor === undefined) {
        color = 'back';
    } else {
        color = cardColor.toLowerCase();
    }

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
            <Tooltip title={myTurn !== undefined ? "Pick random wagon card" : "Used wagon card pile"} placement="right">
                <Card
                    onClick={myTurn === true ? onClick : () => {
                    }}
                    sx={{cursor: myTurn === true ? 'pointer' : 'default'}}
                >
                    <CardMedia
                        component="img"
                        image={CardImages[color]}
                        alt="Card"
                    />
                </Card>
            </Tooltip>
        </Badge>
    )
}
