import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    Box, Grid, Typography,
} from "@mui/material";
import Loader from "../general/Loader.tsx";
import {useLobbyState} from "../../hooks/lobbyHooks/useLobbyState.ts";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext, useState} from "react";
import {useSetPublic} from "../../hooks/lobbyHooks/useSetPublic.ts";
import SettingsDialog from "./SettingsDialog.tsx";
import SettingsIcon from '@mui/icons-material/Settings';
import InviteFriendDialog from "./InviteFriendDialog.tsx";
import GameStartedButton from "./GameStartedButton.tsx";
import ColorSetter from "./ColorSetter.tsx";
import StartGameButton from "./StartGameButton.tsx";
import CopyLobbyCode from "./CopyLobbyCode.tsx";
import TogglePrivateLobby from "./TogglePrivateLobby.tsx";
import LeaveButton from "./LeaveButton.tsx";
import DisbandButton from "./DisbandButton.tsx";
import LobbyPlayer from "./LobbyPlayer.tsx";


function LobbyContent({lobbyId}: { lobbyId: string }) {
    const navigate = useNavigate();
    const setPublic = useSetPublic()
    const {loggedInUserId} = useContext(SecurityContext)
    const {isLoading, isError, data: lobbyState, refetch} = useLobbyState(lobbyId);

    const [copied, setCopied] = useState(false);
    const [isSettingsDialogOpen, setSettingsDialogOpen] = useState(false);
    const [isInviteDialogOpen, setInviteDialogOpen] = useState(false);

    const handleInviteDialogOpen = () => setInviteDialogOpen(true);
    const handleInviteDialogClose = () => setInviteDialogOpen(false);

    const handleSettingsDialogOpen = () => {
        setSettingsDialogOpen(true);
    };

    const handleSettingsDialogClose = () => {
        setSettingsDialogOpen(false);
    };

    if (isLoading) return <Loader>Loading Lobby Details...</Loader>;

    if (isError || !lobbyState) {
        return <Alert severity="error">This lobby doesn't exist (Anymore).</Alert>;
    }



    const handleCopySuccess = () => {
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2500);
    };

    const handleToggleChange = async () => {
        await setPublic.mutateAsync(lobbyId);
        await refetch();
    }

    const hostUserId: string = lobbyState?.lobbyUsersDto?.find(lud => lud.isHost)?.id ?? 'defaultUserId';
    const loggedInLobbyUser = lobbyState.lobbyUsersDto.find(lud => lud.applicationUserDto.id === loggedInUserId)

    return (
        <Box>
            <Grid container direction="row">
                <Grid item key={lobbyId} xs={12} md={8} paddingLeft={2}>
                    <Typography variant={"h2"}
                                sx={{
                                    textAlign: "center"
                                }}
                    >Players</Typography>
                    {lobbyState.lobbyUsersDto
                        .slice()
                        .sort((a, b) => a.applicationUserDto.username.localeCompare(b.applicationUserDto.username))
                        .map((player) => (
                            <LobbyPlayer
                                key={player.id}
                                player={player}
                                hostUserId={hostUserId}
                                loggedInLobbyUserId={loggedInUserId!}
                                loggedInLobbyUser={loggedInLobbyUser!}
                                lobbyId={lobbyId}
                                refetch={refetch}
                                lobbyState={lobbyState}
                            />
                        ))}
                </Grid>
                <Grid item xs={12} md={4} px={2}>
                    <Typography variant={"h2"} sx={{
                        textAlign: "center"
                    }}>Settings</Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: "100%",
                        width: "100%"
                    }}>
                        <Box sx={{
                            width: "100%",
                            marginTop: "1vh",
                        }}>
                            {lobbyState.lobbyUsersDto.some(
                                (player) => player.applicationUserDto.id === loggedInUserId && player.isHost
                            ) && (
                                <Box>
                                    <Button sx={{
                                        width: "100%"
                                    }} variant={"outlined"} onClick={handleSettingsDialogOpen}><SettingsIcon/></Button>
                                    <SettingsDialog
                                        open={isSettingsDialogOpen}
                                        onClose={handleSettingsDialogClose}
                                        lobbySettings={{lobbyId: lobbyId, settingDto: lobbyState.settingDto}}
                                    />
                                </Box>
                            )}
                        </Box>
                        <Box sx={{
                            width: "100%",
                            marginTop: "1vh",
                        }}>
                            {!lobbyState.gameId && (
                                <Box>
                                    <Button color="success" variant={"outlined"} sx={{ width: "100%" }} onClick={handleInviteDialogOpen}>
                                        Invite Friend
                                    </Button>
                                    <InviteFriendDialog isOpen={isInviteDialogOpen} onClose={handleInviteDialogClose} lobbyId={lobbyId} />
                                </Box>
                            )}</Box>
                        <Box sx={{
                            width: "100%",
                            marginTop: "1vh",
                        }}>
                            {lobbyState.lobbyUsersDto.some(
                                (player) => player.applicationUserDto.id === loggedInUserId
                            ) && !lobbyState.gameId && (
                                <CopyLobbyCode lobbyCode={lobbyState.code} onCopy={handleCopySuccess} copied={copied}/>
                            )}
                        </Box>
                        <Box sx={{
                            width: "100%",
                            marginTop: "1vh",
                        }}>
                            {<ColorSetter lobbyState={lobbyState}
                                          lobbyId={lobbyId}
                                          refetch={refetch}
                                          loggedInUserId={loggedInUserId}/>}
                        </Box>
                        <Box sx={{
                            width: "100%",
                            marginTop: "1vh",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                            {lobbyState.lobbyUsersDto.some(
                                (player) => player.applicationUserDto.id === loggedInUserId && player.isHost
                            ) && !lobbyState.gameId && (
                                <TogglePrivateLobby lobbyState={lobbyState} onChange={handleToggleChange}/>
                            )}
                        </Box>
                        <Box sx={{
                            width: "100%",
                            marginTop: "1vh",
                        }}>
                            {lobbyState.gameId && (
                                <GameStartedButton onClick={() => navigate(`/game/${lobbyState.gameId}`)}/>
                            )}
                        </Box>
                        <Box sx={{
                            width: "100%"
                        }}>
                            {!lobbyState.gameId && lobbyState.lobbyUsersDto.some(
                                (player) => player.applicationUserDto.id === loggedInUserId && !player.isHost
                            ) ? (
                                <LeaveButton lobbyId={lobbyId} />
                            ) : !lobbyState.gameId && (
                                <DisbandButton lobbyId={lobbyId} />
                            )}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Grid container px={2}>
                <Grid item xs={12}> <Box sx={{
                    width: "100%",
                    marginTop: "20px"
                }}>
                    {
                        lobbyState.lobbyUsersDto.some(
                            (player) => player.applicationUserDto.id === loggedInUserId && player.isHost
                        ) && (
                            <StartGameButton lobbyState={lobbyState} predicate={(player) => player.isHost}
                                             predicate1={(player) => player.isHost &&
                                                 player.applicationUserDto.id === loggedInUserId &&
                                                 lobbyState.lobbyUsersDto.length >= 2 &&
                                                 lobbyState.lobbyUsersDto.length <= 5}
                                             lobbyId={lobbyId}/>
                        )}
                </Box></Grid>
            </Grid>
        </Box>
    );
}


export default function Lobby() {
    const {uuid} = useParams<{ uuid: string }>();
    if (uuid) {
        return <LobbyContent lobbyId={uuid}/>;
    } else {
        return <Alert severity="error">Unable to load this lobby's details.</Alert>;
    }
}