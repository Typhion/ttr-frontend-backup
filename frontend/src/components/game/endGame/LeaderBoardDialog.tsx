import {useEndGameLeaderBoard} from "../../../hooks/gameHooks/useEndGameLeaderBoard.ts";
import {Box, Card, Grid, Typography} from "@mui/material";
import {useContext} from "react";
import SecurityContext from "../../../context/SecurityContext.ts";
import {LeaderboardTwoTone} from "@mui/icons-material";

interface LeaderBoardDialogProps {
    gameId: string;
}

export default function LeaderBoardDialog({gameId}: LeaderBoardDialogProps) {
    const endGameLeaderBoard = useEndGameLeaderBoard(gameId)
    const {loggedInUserId} = useContext(SecurityContext);


    return (
        <Box>
            <Box textAlign={"center"}>
                <LeaderboardTwoTone sx={{fontSize: 50, margin: 'auto'}}/>
            </Box>

            {endGameLeaderBoard.data?.map((player) => (
                <Card key={player.id} sx={{
                    margin: '1%',
                    padding: '1%',
                    backgroundColor: player.id === loggedInUserId ? 'primary.main' : 'primary.light',
                    border: `4px solid ${player.color}`,
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={2}>
                            <Typography variant="h6" component="div">
                                {player.place}
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="h5" color="text">
                                {player.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="h5" color="text" textAlign={"end"}>
                                {player.score}
                            </Typography>
                        </Grid>
                    </Grid>
                </Card>
            ))}

        </Box>
    );
}
