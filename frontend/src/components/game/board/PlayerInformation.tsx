import { Card, CardContent, Typography } from "@mui/material";
import {PlayerState} from "../../../model/GameState";

interface PlayerInformationProps {
    playerState: PlayerState;
}

export default function PlayerInformation({ playerState }: PlayerInformationProps) {
    return (
        <Card sx={{
            //contrasting theme
            backgroundColor: theme => theme.palette.secondary.dark
            ,
        }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Status
                </Typography>
                <Typography variant="body2">
                    Score: {playerState.score}
                </Typography>
                <Typography variant="body2">
                    Wagon Amount: {playerState.wagonAmount}
                </Typography>
                <Typography variant="body2">
                    Station Amount: {playerState.stationAmount}
                </Typography>
            </CardContent>
        </Card>
    )
}
