import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import {Alert, Avatar, Box, Grid, Typography} from "@mui/material";
import {useProfile} from "../../hooks/userHooks/useProfile.ts";
import Loader from "../general/Loader.tsx";
import {getAvatarImage} from "../../model/Profile.ts";
import PersonIcon from "@mui/icons-material/Person";
import {useGetUnlockedAvatars} from "../../hooks/userHooks/useGetUnlockedAvatars.ts";
import {useChangeAvatar} from "../../hooks/userHooks/useChangeAvatar.ts";

export default function Profile() {
    const {uuid} = useParams<{ uuid: string }>();
    const {isLoading: isLoading, isError: isError, data: profile, refetch } = useProfile(uuid);
    const {isLoading: isLoadingAvatars, isError: isErrorAvatars, data: unlockedAvatars} = useGetUnlockedAvatars();
    const changeAvatar = useChangeAvatar(
        () => {
            refetch();
        }
    );
    const navigate = useNavigate();

    if (isLoading || isLoadingAvatars) return <Loader>Loading profile...</Loader>;

    if (isError || isErrorAvatars) {
        return <Alert severity="error">Unable to load profile.</Alert>;
    }

    const handleNavFriends = () => {
        navigate(`/profile/friends`);
    }

    const handleAvatarChange = (avatarId: string) => {
        changeAvatar.mutate(avatarId);
    }

    let avatarImage: string | null = null;
    if (profile?.avatar?.image) {
        avatarImage = getAvatarImage(profile.avatar.image);
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
                        <Avatar sx={{ width: 50, height: 50 }}>
                            {avatarImage ? (
                                <Avatar src={avatarImage} alt="Profile" sx={{ width: '100%', height: '100%' }} />
                            ) : (
                                <PersonIcon sx={{ fontSize: '200%' }} />
                            )}
                        </Avatar>
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

                    <Grid item xs={12} md={4}
                          style={{
                              border: '1px solid black',
                              borderRadius: '5px',
                              padding: '10px',
                              display: 'flex',
                          }}
                          container
                    >
                        <Grid item xs={12}>
                            <Typography variant="h5">Unlocked Avatars</Typography>
                        </Grid>
                        {unlockedAvatars && unlockedAvatars.map((avatar, index) => (
                            <Box key={index}>
                                <Avatar
                                    sx={{ width: 75, height: 75, margin: '5px', cursor: 'pointer' }}
                                    onClick={() => handleAvatarChange(avatar.id)}
                                >
                                    {getAvatarImage(avatar.image) ? (
                                        <Avatar src={getAvatarImage(avatar.image)!} alt="Profile" sx={{ width: '100%', height: '100%' }} />
                                    ) : (
                                        <PersonIcon sx={{ fontSize: '200%' }} />
                                    )}
                                </Avatar>
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            )}
        </Grid>
    )
}