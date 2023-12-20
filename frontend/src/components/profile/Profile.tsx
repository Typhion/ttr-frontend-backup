import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {Alert, Grid, Typography} from "@mui/material";
import {useProfile} from "../../hooks/useProfile.ts";
import Loader from "../general/Loader.tsx";

export default function Profile() {
    const {uuid} = useParams<{ uuid: string }>();
    const {isLoading: isLoading, isError: isError, data: profile} = useProfile(uuid);
    const navigate = useNavigate();

    if (isLoading) return <Loader>Loading profile...</Loader>;

    if (isError) {
        return <Alert severity="error">Unable to load profile.</Alert>;
    }

    const handleNavFriends = () => {
        navigate(`/profile/friends`);
    }

    return (
        <Grid container style={{
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
        }} spacing={2}>
            {!uuid && (
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        sx={{height: '100%', marginBottom: '10%'}}
                        onClick={handleNavFriends}
                    >
                        Friends
                    </Button>
                </Grid>
            )}
            {profile && (
                <Grid item xs={12}
                      style={{
                          display: 'flex',
                          flexDirection: 'row',
                          maxWidth: '80%',
                      }}
                      container
                >
                    <Grid item xs={12} md={4}
                          style={{
                              border: '1px solid black',
                              borderRadius: '5px',
                              padding: '10px',
                          }}
                    >
                        <Typography variant="h5">Profile</Typography>
                        <Typography variant="body1">{profile.username}</Typography>
                    </Grid>
                    <Grid item xs={12} md={8}
                          style={{
                              border: '1px solid black',
                              borderRadius: '5px',
                              padding: '10px',
                          }}
                          container
                    >
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">Games Played</Typography>
                            <Typography variant="body1">{profile.stats.gamesPlayed} played</Typography>
                            <Typography variant="body1">{profile.stats.gamesWon} wins</Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant="h5">Score</Typography>
                            <Typography variant="body1">{profile.stats.totalScore} score</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}