import {PlayerState} from "../../../model/GameState.ts";
import {Alert, Avatar, Box, Card, Grid, Typography} from "@mui/material";
import {useGetPlayerAvatar} from "../../../hooks/userHooks/useGetPlayerAvatar.ts";
import Loader from "../../general/Loader.tsx";
import PersonIcon from "@mui/icons-material/Person";
import TrainIcon from "@mui/icons-material/Train";
import AvatarImages from "../../../assets/images/avatars/index.ts";

interface PlayerIconProps {
    playerState: PlayerState;
}

export default function PlayerIcon({playerState}: PlayerIconProps) {
    const {score, wagonAmount, stationAmount} = playerState;
    const {isLoading, isError, data: playerAvatar} = useGetPlayerAvatar(playerState.applicationUserId);

    if (isLoading) return <Loader>Loading Player Avatar...</Loader>;
    if (isError || !playerAvatar) return <Alert severity="error">Unable to load this player's avatar.</Alert>;

    const avatarImage = AvatarImages[playerAvatar.image];

    const carriageStyle = {
        display: "inline-block",
        width: `${40}px`,
        height: `${20}px`,
        backgroundColor: playerState.color.toLowerCase() !== 'gray' ? playerState.color : 'transparent',
        borderRadius: "5%",
    };

    const windowStyle = {
        display: "inline-block",
        width: `${6}px`,
        height: `${12}px`,
        backgroundColor: "#FFF",
        border: "1px solid #000",
        margin: `0 ${2 / 40 * (40)}px`,
        position: "absolute",
        top: "10%"
    };


    return (
        <Grid container spacing={2} direction="row">
            <Grid item xs={5}>
                <Box
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: `5px solid ${playerState.color.toLowerCase()}`,
                        borderRadius: '50%',
                        width: '5vw',
                        height: '5vw',
                    }}
                >
                    <Avatar sx={{width: '100%', height: '100%'}}>
                        {playerAvatar.image && avatarImage ? (
                            <img src={avatarImage} alt={`Avatar of ${playerState.username}`}
                                 style={{width: '100%', height: '100%', borderRadius: '50%'}}/>
                        ) : (
                            <PersonIcon sx={{fontSize: '200%'}}/>
                        )}
                    </Avatar>
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Grid container direction="column" sx={{display: 'inline-block', marginRight: '5px'}}>
                    <Card sx={{paddingX: 2, display: 'inline-block', height: '100%'}}>
                        <Grid item>

                            <Typography variant="h6" marginRight={2} sx={{display: 'inline-block'}}>{score}</Typography>
                            <Typography variant="subtitle1"
                                        sx={{display: 'inline-block'}}>Score</Typography>
                        </Grid>
                        <Grid item>
                            <Box display="flex" alignItems="center" sx={{display: "inline-block"}}>
                                <Typography variant="h6" marginRight={1}
                                            sx={{display: "inline-block"}}>{wagonAmount}</Typography>
                                <Box sx={{position: "relative", display: "inline-block"}}>
                                    <Box sx={carriageStyle}>
                                        <Box sx={windowStyle} left={'10%'}></Box>
                                        <Box sx={windowStyle} left={'40%'}></Box>
                                        <Box sx={windowStyle} left={'70%'}></Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item>
                            <Box display="flex" alignItems="center" sx={{display: "inline-block"}}>
                                <Typography variant="h6" marginRight={2} sx={{
                                    display: "inline-block",
                                    verticalAlign: 'middle'
                                }}>{stationAmount}</Typography>
                                <TrainIcon sx={{display: "inline-block", verticalAlign: 'middle'}}/>
                            </Box>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}
