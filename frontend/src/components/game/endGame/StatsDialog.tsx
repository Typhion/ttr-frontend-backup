import {Box, Grid, Paper, Typography} from "@mui/material";
import {useEndGameStats} from "../../../hooks/gameHooks/useEndGameStats.ts";

interface StatsDialogProps {
    gameId: string;
}

export default function StatsDialog({gameId}: StatsDialogProps) {
    const endGameStats = useEndGameStats(gameId);

    return (
        <Box textAlign={"center"}>
            <Typography variant="h6" component="div">
                Your Game Stats
            </Typography>
            <Paper elevation={3} style={{padding: '20px', margin: '20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Longest route:</Typography>
                        <Typography variant="body1" align="right">{endGameStats.data?.longestRoute}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Amount of completed routes:</Typography>
                        <Typography variant="body1" align="right">{endGameStats.data?.completedRoutes}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Amount of completed trains:</Typography>
                        <Typography variant="body1" align="right">{endGameStats.data?.completedTrains}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Amount of completed ferries:</Typography>
                        <Typography variant="body1" align="right">{endGameStats.data?.completedFerries}</Typography>
                    </Grid>
                    <Grid item xs={12} style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="body1">Amount of completed tunnels:</Typography>
                        <Typography variant="body1" align="right">{endGameStats.data?.completedTunnels}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
}
