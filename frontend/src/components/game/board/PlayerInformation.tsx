import { Card, CardContent, Typography } from "@mui/material";
import {PlayerState} from "../../../model/GameState";

interface PlayerInformationProps {
    playerState: PlayerState;
}

export default function PlayerInformation({ playerState }: PlayerInformationProps) {
    return (
        <Card sx={{
            backgroundColor: theme => theme.palette.secondary.dark,
            marginY: '1vh',
            height: '18vh',
            display: 'flex',      // Enable flex container
            flexDirection: 'column', // Stack children vertically
            justifyContent: 'center', // Center vertically
            alignItems: 'center',  // Center horizontally
        }}>
            <CardContent>
                <Typography variant="h6" component="h6" sx={{ fontSize: '3.5vh' }}>
                    Status
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '2vh' }}>
                    Score: {playerState.score}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '2vh' }}>
                    Wagon Amount: {playerState.wagonAmount}
                </Typography>
                <Typography variant="body2" sx={{ fontSize: '2vh' }}>
                    Station Amount: {playerState.stationAmount}
                </Typography>
            </CardContent>
        </Card>
    )
}
