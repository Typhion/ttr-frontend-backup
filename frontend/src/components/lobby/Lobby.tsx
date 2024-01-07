import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {
    Alert,
    Box, Grid,
} from "@mui/material";
import Loader from "../general/Loader.tsx";
import {useLobbyState} from "../../hooks/lobbyHooks/useLobbyState.ts";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext, useState} from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import {useSetPublic} from "../../hooks/lobbyHooks/useSetPublic.ts";
import SettingsDialog from "./SettingsDialog.tsx";
import SettingsIcon from '@mui/icons-material/Settings';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import {useKickLobbyUser} from "../../hooks/lobbyHooks/useKickLobbyUser.ts";
import {useBanLobbyUser} from "../../hooks/lobbyHooks/useBanLobbyUser.ts";
import BlockIcon from '@mui/icons-material/Block';
import InviteFriendDialog from "./InviteFriendDialog.tsx";
import GameStartedButton from "./GameStartedButton.tsx";
import ToggleReadyButton from "./ToggleReadyButton.tsx";
import ColorSetter from "./ColorSetter.tsx";
import StartGameButton from "./StartGameButton.tsx";
import CopyLobbyCode from "./CopyLobbyCode.tsx";
import TogglePrivateLobby from "./TogglePrivateLobby.tsx";
import LeaveButton from "./LeaveButton.tsx";
import DisbandButton from "./DisbandButton.tsx";


function LobbyContent({lobbyId}: { lobbyId: string }) {
    const navigate = useNavigate();
    const setPublic = useSetPublic()
    const kickLobbyUser = useKickLobbyUser();
    const banLobbyUser = useBanLobbyUser();
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

    const handleKickLobbyUser = (lobbyId: string, userId: string) => {
        kickLobbyUser.mutate({lobbyId, userId})
    }

    const handleBanLobbyUser = (lobbyId: string, userId: string) => {
        banLobbyUser.mutate({lobbyId, userId})
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
            {lobbyState.lobbyUsersDto.some(
                (player) => player.applicationUserDto.id === loggedInUserId && player.isHost
            ) && (
                <Box>
                    <Button onClick={handleSettingsDialogOpen}><SettingsIcon/></Button>
                    <SettingsDialog
                        open={isSettingsDialogOpen}
                        onClose={handleSettingsDialogClose}
                        lobbySettings={{lobbyId: lobbyId, settingDto: lobbyState.settingDto}}
                    />
                </Box>
            )}
            <Button onClick={handleInviteDialogOpen}>Invite Friend</Button>

            <InviteFriendDialog
                isOpen={isInviteDialogOpen}
                onClose={handleInviteDialogClose}
                lobbyId={lobbyId}
            />
            {lobbyState.lobbyUsersDto.some(
                (player) => player.applicationUserDto.id === loggedInUserId && !player.isHost
            ) ? (
                    <LeaveButton lobbyId={lobbyId}/>
                ) :
                (
                    <DisbandButton lobbyId={lobbyId}/>
                )
            }
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        border: '2px solid black',
                        padding: '5%',
                        marginBottom: '20px',
                        width: '70vw'
                    }}
                >
                    {lobbyState.lobbyUsersDto.map((player) => (
                        <Grid
                            key={player.id}
                            container
                            sx={{
                                border: '2px solid black',
                                marginBottom: '15px',
                                fontSize: '32px',
                                width: '100%',
                                padding: '5px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                                <span style={{minWidth: '5%'}}>{player.isHost ? '👑' : ''}</span>
                            </Grid>
                            <Grid item xs={2} sx={{display: 'flex', alignItems: 'center'}}>
                                <div
                                    style={{
                                        backgroundColor: player.color,
                                        width: '20px',
                                        height: '20px',
                                        marginRight: '10px',
                                        border: '1px solid black',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3} sx={{display: 'flex', alignItems: 'center'}}>
                                {player.applicationUserDto.username}
                            </Grid>

                            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                                {player.ready ? (
                                    <DoneIcon sx={{marginLeft: '20px', color: 'green'}}/>
                                ) : (
                                    <ClearIcon sx={{marginLeft: '20px', color: 'red'}}/>
                                )}
                            </Grid>
                            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                                {(hostUserId === loggedInLobbyUser?.id && !player.isHost) && (
                                    <Box>
                                        <PersonRemoveIcon
                                            onClick={() => handleKickLobbyUser(lobbyId, player.id)}
                                            style={{cursor: 'pointer'}}
                                        />
                                    </Box>
                                )}
                            </Grid>
                            <Grid item xs={1} sx={{display: 'flex', alignItems: 'center'}}>
                                {(hostUserId === loggedInLobbyUser?.id && !player.isHost) && (
                                    <Box>
                                        <BlockIcon
                                            onClick={() => handleBanLobbyUser(lobbyId, player.id)}
                                            style={{cursor: 'pointer'}}
                                        />
                                    </Box>
                                )}
                            </Grid>

                        </Grid>
                    ))}
                </Box>

                {<ColorSetter lobbyState={lobbyState}
                              lobbyId={lobbyId}
                              refetch={refetch}
                              loggedInUserId={loggedInUserId}/>}

                <Box
                    sx={{
                        width: '33.33%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {lobbyState.lobbyUsersDto.some(
                        (player) => player.applicationUserDto.id === loggedInUserId && player.isHost
                    ) && !lobbyState.gameId && (
                        <TogglePrivateLobby lobbyState={lobbyState} onChange={handleToggleChange}/>
                    )}
                </Box>
                <Box
                    sx={{
                        width: "33.33%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {lobbyState.lobbyUsersDto.some(
                        (player) => player.applicationUserDto.id === loggedInUserId
                    ) && !lobbyState.gameId && (
                        <CopyLobbyCode lobbyCode={lobbyState.code} onCopy={handleCopySuccess} copied={copied}/>
                    )}
                </Box>
                {lobbyState.gameId && (
                    <GameStartedButton onClick={() => navigate(`/game/${lobbyState.gameId}`)}/>
                )}
                <Box
                    sx={{
                        display: 'flex',
                        width: '100%',
                        position: 'absolute',
                        bottom: 10,
                        left: 0,
                        right: 0,
                    }}
                >
                    {<ToggleReadyButton lobbyState={lobbyState}
                                        lobbyId={lobbyId}
                                        refetch={refetch}
                                        loggedInUserId={loggedInUserId}/>}
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
                    <Box sx={{
                        width: '33.33%', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        Europe
                    </Box>
                </Box>
            </Box>
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
