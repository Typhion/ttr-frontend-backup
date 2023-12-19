import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useCreateGame} from "../../hooks/useCreateGame.ts";
import {
    Alert,
    Box,
    FormControlLabel,
    FormGroup,
    Input,
    InputAdornment, Switch, Typography
} from "@mui/material";
import {useSetReady} from "../../hooks/useSetReady.ts";
import Loader from "../general/Loader.tsx";
import {useLobbyState} from "../../hooks/useLobbyState.ts";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext, useState} from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import CopyToClipboard from 'react-copy-to-clipboard';
import {useSetPublic} from "../../hooks/useSetPublic.ts";
import {useSetColor} from "../../hooks/useSetColor.ts";
import SettingsDialog from "./SettingsDialog.tsx";
import SettingsIcon from '@mui/icons-material/Settings';
import {GameInitDto} from "../../model/LobbyState.ts";
import {useStartGame} from "../../hooks/useStartGame.ts";
import InviteFriendDialog from "./InviteFriendDialog.tsx";

function LobbyContent({lobbyId}: { lobbyId: string }) {
    const navigate = useNavigate();
    const setReady = useSetReady()
    const setPublic = useSetPublic()
    const setColor = useSetColor()
    const {loggedInUserId} = useContext(SecurityContext)
    const {isLoading, isError, data: lobbyState, refetch} = useLobbyState(lobbyId);
    const startGame = useStartGame();
    const createGame = useCreateGame(
        (gameId) => {
            startGame.mutate({lobbyId, gameId})
            navigate(`/game/${gameId}`)
        }
    )

    const [copied, setCopied] = useState(false);
    const [userColor, setUserColor] = useState<string | null>(null);
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
        return <Alert severity="error">Unable to load this lobby's details.</Alert>;
    }

    const allPlayersReady = lobbyState.lobbyUsersDto.every((player) => player.ready);
    const handleColorChange = (newColor: string) => {
        setUserColor(newColor);
    };

    const handleOnColorClick = (color: string) => {
        setColor.mutate({lobbyId, color});
        refetch();
    }

    const handleOnReadyClick = () => {
        setReady.mutate(lobbyId);
        refetch();
    }

    const handleOnStartClick = (gameInitDto: GameInitDto) => {
        if (allPlayersReady) {
            createGame.mutate(gameInitDto)
        }
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
                        <Box
                            key={player.id}
                            sx={{
                                border: '2px solid black',
                                marginBottom: '15px',
                                display: 'grid',
                                gridTemplateColumns: '10fr 20fr 20fr 1fr ',
                                alignItems: 'center',
                                fontSize: '32px',
                                width: '100%',
                                padding: '5px',
                                justifyContent: 'space-between',
                            }}
                        >
                            <span style={{minWidth: '5%'}}>{player.isHost ? "👑" : ""}</span>
                            <div
                                style={{
                                    backgroundColor: player.color,
                                    width: '20px',
                                    height: '20px',
                                    marginRight: '10px',
                                    border: '1px solid black',
                                }}
                            />
                            {player.applicationUserDto.username}
                            {player.ready ? (
                                <DoneIcon sx={{marginLeft: '20px', color: 'green'}}/>
                            ) : (
                                <ClearIcon sx={{marginLeft: '20px', color: 'red'}}/>
                            )}
                        </Box>
                    ))}
                </Box>

                {lobbyState.lobbyUsersDto.some(
                    (player) => player.applicationUserDto.id === loggedInUserId
                ) && !lobbyState.gameId && (
                    <Box
                        sx={{
                            marginBottom: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '32px',
                            padding: '5px',
                            justifyContent: 'center',
                            width: '40vw',
                        }}
                    >
                        <span style={{minWidth: '5%'}}>Color:</span>
                        <input
                            type="color"
                            value={userColor || lobbyState.lobbyUsersDto.find(
                                (player) => player.applicationUserDto.id === loggedInUserId
                            )?.color || '#000000'}
                            onChange={(e) => handleColorChange(e.target.value)}
                            style={{
                                marginRight: '10px',
                                border: 'none',
                                width: '30px',
                                height: '30px',
                                borderRadius: '100%',
                                boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.3)',
                                cursor: 'pointer',
                                outline: 'none',
                            }}
                        />
                        -
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: "green",
                                color: "white",
                                marginLeft: '10px',
                            }}
                            onClick={() => handleOnColorClick(userColor || '#000000')}
                        >
                            Set Color
                        </Button>
                    </Box>

                )}

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
                        <FormGroup>
                            <FormControlLabel control={<Switch defaultValue={String(lobbyState.isPublic)}/>}
                                              onChange={handleToggleChange}
                                              label={lobbyState.isPublic ? "public" : "private"}/>
                        </FormGroup>
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
                        <Input
                            value={lobbyState.code}
                            endAdornment={
                                <InputAdornment position="end">
                                    <CopyToClipboard text={lobbyState.code} onCopy={handleCopySuccess}>
                                        <Button
                                            variant="contained"
                                            sx={{
                                                width: "100%",
                                                backgroundColor: "green",
                                                color: "white",
                                            }}
                                        >
                                            {copied ? "Copied!" : "Copy Code"}
                                        </Button>
                                    </CopyToClipboard>
                                </InputAdornment>
                            }
                            readOnly
                            sx={{
                                width: "100%",
                                padding: "8px",
                                fontSize: "16px",
                                borderRadius: "4px",
                            }}
                        />
                    )}
                </Box>
                {lobbyState.gameId && (
                    <Box
                        sx={{
                            marginTop: '2%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography>De game is al gestart, klik hier om de game te joinen</Typography>
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: '2%',
                                backgroundColor: 'green',
                                color: 'white',
                            }}
                            onClick={() => navigate(`/game/${lobbyState.gameId}`)}>
                            Join Game
                        </Button>
                    </Box>
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
                    <Box sx={{
                        width: '33.33%', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {lobbyState.lobbyUsersDto.some(
                            (player) => player.applicationUserDto.id === loggedInUserId
                        ) && (
                            <Button
                                variant="contained"
                                sx={{
                                    width: '10%',
                                    margin: 'auto',
                                    backgroundColor: 'green',
                                    color: 'white',
                                }}
                                onClick={handleOnReadyClick}
                                disabled={!!lobbyState.gameId}
                            >
                                Ready
                            </Button>
                        )}
                    </Box>
                    <Box sx={{
                        width: '33.33%', display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        {lobbyState.lobbyUsersDto.some((player) => player.isHost) && (
                            <Button
                                variant="contained"
                                sx={{
                                    width: '25%',
                                    marginLeft: '10px',
                                    backgroundColor: 'green',
                                    color: 'white',
                                }}
                                onClick={() => handleOnStartClick(lobbyState?.gameInitDto)}
                                disabled={!lobbyState.lobbyUsersDto.find((player) => player.isHost && player.applicationUserDto.id === loggedInUserId) || !!lobbyState.gameId || !allPlayersReady}
                            >
                                Start Game
                            </Button>
                        )}
                    </Box>
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
