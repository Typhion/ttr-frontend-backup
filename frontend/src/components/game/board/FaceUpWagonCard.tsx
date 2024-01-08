import CardImages from "../../../assets/images/cards/index.ts";
import {Card, CardMedia, Tooltip} from "@mui/material";

interface FaceUpWagonCardProps {
    cardColor: string;
    onClick: () => void;
    myTurn: boolean;
}

export default function FaceUpWagonCard({cardColor, onClick, myTurn}: FaceUpWagonCardProps) {
    const color = cardColor.toLowerCase();

    if (color in CardImages) {
        return (
            <Tooltip title={"Pick " + cardColor.toLowerCase() + " card"} placement="right">
                <Card
                    onClick={myTurn ? onClick : undefined}
                    sx={{width: '100%', cursor: myTurn ? 'pointer' : 'default'}}
                >
                    <CardMedia
                        component="img"
                        image={CardImages[color]}
                        alt="FaceUpWagonCard"
                    />
                </Card>
            </Tooltip>
        )
    }
}
