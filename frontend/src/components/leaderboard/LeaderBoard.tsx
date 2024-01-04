import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {
    LeaderboardTwoTone
} from "@mui/icons-material";
import {useTopLeaderBoard} from "../../hooks/leaderboardHooks/useTopLeaderBoard.ts";
import {useContext} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {useOwnLeaderBoard} from "../../hooks/leaderboardHooks/useOwnLeaderBoard.ts";

export default function LeaderBoard() {
    const {loggedInUserId} = useContext(SecurityContext);
    const topLeaderBoard = useTopLeaderBoard();
    const ownLeaderBoard = useOwnLeaderBoard();

    return (
        <Box>
            <Box textAlign={"center"}>
                <Typography variant="h4" component="div" gutterBottom>
                    <LeaderboardTwoTone sx={{fontSize: 100, marginBottom: '20px'}}/>
                </Typography>
            </Box>
            <Box sx={{marginTop: '1%'}}>
                <Grid container spacing={2}>
                    {topLeaderBoard.data?.map((user) => (
                        <Grid item key={user.id} xs={12}>
                            <Card sx={{
                                width: '50%',
                                margin: 'auto',
                                backgroundColor: user.id === loggedInUserId ? 'primary.main' : 'background.paper',
                            }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item xs={5}>
                                            <Typography variant="h6" component="div">
                                                {user.place}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={5}>
                                            <Typography variant="h5" color="text">
                                                {user.username}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <Typography variant="h5" color="text" textAlign={"end"}>
                                                {user.score}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                {ownLeaderBoard.data && (
                    <Grid item xs={12}>
                        <Card sx={{
                            width: '50%',
                            margin: 'auto',
                            backgroundColor: 'primary.main',
                            marginTop: '2%',
                        }}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={5}>
                                        <Typography variant="h6" component="div">
                                            {ownLeaderBoard.data.place}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="h5" color="text">
                                            {ownLeaderBoard.data.username}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant="h5" color="text" textAlign={"end"}>
                                            {ownLeaderBoard.data.score}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                )}
            </Box>
        </Box>
    );
};
