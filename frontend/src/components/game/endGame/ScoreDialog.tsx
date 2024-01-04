import {Box, Divider, Grid, Paper, Typography} from "@mui/material";
import {useEndGameScore} from "../../../hooks/gameHooks/useEndGameScore.ts";

interface ScoreDialogProps {
    gameId: string;
}

export default function ScoreDialog({gameId}: ScoreDialogProps) {
    const endGameScore = useEndGameScore(gameId);

    return (
        <Box textAlign={"center"}>
            <Typography variant="h6" component="div">
                Your Score Calculations
            </Typography>
            <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
                <Grid container spacing={2} direction="column">
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Score from completed routes:</Typography>
                        <Typography variant="body1" align="right">{endGameScore.data?.routeScore}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Score from incompleted routes:</Typography>
                        <Typography variant="body1" align="right">{endGameScore.data?.incompleteRouteScore}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Score from connections:</Typography>
                        <Typography variant="body1" align="right">{endGameScore.data?.connectionScore}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Score from longest route:</Typography>
                        <Typography variant="body1" align="right">{endGameScore.data?.longestRouteScore}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Score from stations:</Typography>
                        <Typography variant="body1" align="right">{endGameScore.data?.stationScore}</Typography>
                    </Grid>
                    <Divider variant="middle" style={{margin: '10px 0'}}/>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Total score:</Typography>
                        <Typography variant="body1" align="right">{endGameScore.data?.totalScore}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
