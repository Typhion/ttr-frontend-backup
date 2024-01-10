import {LobbyState, LobbyUserDto} from "../../model/LobbyState.ts";
import {
    Alert,
    Avatar,
    Box,
    Card,
    CardHeader,
    Grid,
    IconButton,
    Tooltip,
    Typography
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import BlockIcon from "@mui/icons-material/Block";
import {useKickLobbyUser} from "../../hooks/lobbyHooks/useKickLobbyUser.ts";
import {useBanLobbyUser} from "../../hooks/lobbyHooks/useBanLobbyUser.ts";
import {useProfile} from "../../hooks/userHooks/useProfile.ts";
import {getAvatarImage} from "../../model/Profile.ts";
import StarIcon from '@mui/icons-material/Star';
import ToggleReadyButton from "./ToggleReadyButton.tsx";
import {QueryObserverResult} from "@tanstack/react-query";
import Loader from "../general/Loader.tsx";

type LobbyPlayerProps = {
    player: LobbyUserDto,
    hostUserId: string,
    loggedInLobbyUserId: string,
    loggedInLobbyUser: LobbyUserDto,
    lobbyId: string,
    refetch: () => Promise<QueryObserverResult<LobbyState | null | undefined, unknown>>,
    lobbyState: LobbyState
}

export default function LobbyPlayer({
                                        player,
                                        hostUserId,
                                        loggedInLobbyUserId,
                                        lobbyId,
                                        refetch,
                                        lobbyState,
                                        loggedInLobbyUser
                                    }: LobbyPlayerProps) {
    const kickLobbyUser = useKickLobbyUser();
    const banLobbyUser = useBanLobbyUser();
    const {isLoading, isError, data: profile} = useProfile(player.applicationUserDto.id)

    if (isLoading) return <Loader>Loading Profile Details...</Loader>;

    if (isError) {
        return <Alert severity="error">This profile doesn't exist.</Alert>;
    }

    const handleBanLobbyUser = (lobbyId: string, userId: string) => {
        banLobbyUser.mutate({lobbyId, userId})
    }
    const handleKickLobbyUser = (lobbyId: string, userId: string) => {
        kickLobbyUser.mutate({lobbyId, userId})
    }
    let avatarImage: string | null = null;
    if (profile?.avatar?.image) {
        avatarImage = getAvatarImage(profile.avatar.image);
    }

    return (
        <Card key={player.id} variant={"outlined"} sx={{
            display: "flex",
            margin: "1vh",
            ...(profile?.lobbyBanner?.styling ? JSON.parse(profile.lobbyBanner.styling) : {}),
            padding: "0",
        }}>
            <Grid container sx={{justifyContent: "center", alignItems: "center"}}>
                <Grid xs={1} item>
                    {player.isHost ?
                        <Tooltip title="Host">
                            <StarIcon/>
                        </Tooltip>
                        : ""}
                </Grid>
                <Grid xs={1} item>
                    <CardHeader avatar={
                        <Avatar src={avatarImage!} alt={"playerAvatar" + player.id}/>
                    }/>
                </Grid>
                <Grid item xs={4}>
                    <Typography fontSize={20}>{player.applicationUserDto.username}</Typography>
                </Grid>
                <Grid item xs={1}>
                    <Box
                        style={{
                            backgroundColor: player.color,
                            width: '20px',
                            height: '20px',
                            marginRight: '10px',
                            border: '1px solid black',
                        }}
                    />
                </Grid>
                <Grid item xs={2}>{player.applicationUserDto.id === loggedInLobbyUserId ? (
                    <ToggleReadyButton
                        readyCheck={player.ready}
                        lobbyState={lobbyState}
                        lobbyId={lobbyId}
                        refetch={refetch}
                        loggedInUserId={loggedInLobbyUserId}/>
                ) : (player.ready ? (
                    <IconButton disabled={true}>
                        <DoneIcon sx={{color: 'green'}}/>
                    </IconButton>
                ) : (
                    <IconButton disabled={true}>
                        <ClearIcon sx={{color: 'red'}}/>
                    </IconButton>
                ))}
                </Grid>
                <Grid item xs={1}>{(hostUserId === loggedInLobbyUser.id && !player.isHost) && (
                    <Tooltip title={"Temporarily kick this user from your lobby"}>
                        <IconButton onClick={() => handleKickLobbyUser(lobbyId, player.id)}
                                    style={{cursor: 'pointer'}}>
                            <PersonRemoveIcon/>
                        </IconButton>
                    </Tooltip>
                )}</Grid>
                <Grid item xs={1}>
                    {(hostUserId === loggedInLobbyUser.id && !player.isHost) && (
                        <Tooltip title={"Permanently remove this user from your lobby"}>
                            <IconButton onClick={() => handleBanLobbyUser(lobbyId, player.id)}
                                        style={{cursor: 'pointer'}}>
                                <BlockIcon/>
                            </IconButton>
                        </Tooltip>
                    )}
                </Grid>
            </Grid>
        </Card>
    )
}