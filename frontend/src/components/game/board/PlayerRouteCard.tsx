import {Card, CardContent, Typography} from "@mui/material";

interface PlayerRouteCardProps {
    beginCity: string;
    endCity: string;
    connectionSize: number;
    large: boolean;
}



export default function PlayerRouteCard(playerRouteCard: PlayerRouteCardProps) {

    if(playerRouteCard.large){
        return (
            <Card sx={{
                border: '1px solid grey',
                width: '100%',
                height: '100%',
                marginLeft: '2px',
            }}>
                <CardContent>
                    <Typography>{playerRouteCard.beginCity} - {playerRouteCard.endCity}</Typography>
                    <Typography>{"Size: " + playerRouteCard.connectionSize}</Typography>
                </CardContent>
            </Card>
        );
    }
    else{
        return (
            <Card sx={{
                border: '1px solid grey',
                width: '100%',
                height: '100%',
            }}>
                <CardContent>
                    <Typography>{playerRouteCard.beginCity} - {playerRouteCard.endCity}</Typography>
                    <Typography>{"Size: " + playerRouteCard.connectionSize}</Typography>
                </CardContent>
            </Card>
        );
    }
}
