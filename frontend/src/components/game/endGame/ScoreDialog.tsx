import {Box, Typography} from "@mui/material";
import {useEndGameScore} from "../../../hooks/gameHooks/useEndGameScore.ts";

interface ScoreDialogProps {
    gameId: string;
}

export default function ScoreDialog({gameId}: ScoreDialogProps) {
    const endGameScore = useEndGameScore(gameId);

    return (
        <Box>
            <Typography variant="h6">Congratulations! The game is finished.</Typography>
            <Typography variant="body1">Score from completed routes: {endGameScore.data?.routeScore}</Typography>
            <Typography variant="body1">Score from incompleted
                routes: {endGameScore.data?.incompleteRouteScore}</Typography>
            <Typography variant="body1">Score from connections: {endGameScore.data?.connectionScore}</Typography>
            <Typography variant="body1">Score from longest route: {endGameScore.data?.longestRouteScore}</Typography>
            <Typography variant="body1">Score from stations: {endGameScore.data?.stationScore}</Typography>

            <Typography variant="body1">Total score: {endGameScore.data?.totalScore}</Typography>

        </Box>
    );
}
