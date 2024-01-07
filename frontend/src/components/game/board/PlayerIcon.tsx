import {PlayerState} from "../../../model/GameState.ts";
import {Alert, Avatar, Badge, Box, Typography} from "@mui/material";
import {useGetPlayerAvatar} from "../../../hooks/userHooks/useGetPlayerAvatar.ts";
import Loader from "../../general/Loader.tsx";
import PersonIcon from "@mui/icons-material/Person";

interface PlayerIconProps {
    playerState: PlayerState;
}

export default function PlayerIcon({playerState}: PlayerIconProps) {
    const {score, wagonAmount, stationAmount} = playerState;
    const {isLoading, isError,data: playerAvatar} = useGetPlayerAvatar(playerState.applicationUserId);

    if (isLoading) return <Loader>Loading Player Avatar...</Loader>;
    if (isError || !playerAvatar) return <Alert severity="error">Unable to load this player's avatar.</Alert>;

    const avatarImage = `/src/assets/images/avatars/${playerAvatar.image}.png`;
    return (
        <Box sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `5px solid ${playerState.color.toLowerCase()}`,
            borderRadius: '50%',
            width: '6vw',
            height: '6vw',
        }}>
            <Avatar sx={{width: '100%', height: '100%'}}>
                {playerAvatar.image  ? (
                <img src={avatarImage} alt={`Avatar of ${playerState.username}`} style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                ): (
                    <PersonIcon sx={{fontSize: '200%'}}/>)}
            </Avatar>
            <Badge
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                badgeContent={<Typography variant="caption"
                                          sx={{fontSize: '0.8em'}}>{score}</Typography>}
                color="primary"
                sx={{
                    position: 'absolute',
                    transform: 'translate(50%, -40%)',
                    top: '35%',
                    right: '0%'
                }}
            />
            <Badge
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                badgeContent={<Typography variant="caption"
                                          sx={{fontSize: '0.8em'}}>{`${wagonAmount}/${stationAmount}`}</Typography>}
                color="secondary"
                sx={{
                    position: 'absolute',
                    transform: 'translate(50%, 40%)',
                    bottom: '35%',
                    right: '0%'
                }}
            />
        </Box>
    );
}
