import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {useCreateGame} from "../../hooks/useCreateGame.ts";
import {Alert, Box} from "@mui/material";
import {useSetReady} from "../../hooks/useSetReady.ts";
import Loader from "../general/Loader.tsx";
import {useLobbyState} from "../../hooks/useLobbyState.ts";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext} from "react";
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';

function LobbyContent({lobbyId}: { lobbyId: string }) {
    const navigate = useNavigate();
    const setReady = useSetReady()
    const {loggedInUserId} = useContext(SecurityContext)
    const {isLoading, isError, data: lobbyState, refetch} = useLobbyState(lobbyId);
    const createGame = useCreateGame(
        (uuid) => {
            navigate(`/game/${uuid}`)
        }
    )

    if (isLoading) return <Loader>Loading Lobby Details...</Loader>;

    if (isError || !lobbyState) {
        return <Alert severity="error">Unable to load this lobby's details.</Alert>;
    }

    const handleOnReadyClick = async () => {
        await setReady.mutateAsync(lobbyId);
        await refetch();
    }
    const handleOnStartClick = () => {
        createGame.mutate()
    }

    return (
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
                }}
            >
                {lobbyState.lobbyUsersDto.map((player) => (
                    <Box
                        key={player.id}
                        sx={{
                            marginBottom: '15px',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '32px',
                        }}
                    >
                        {player.isHost && <span style={{marginRight: '5px'}}>👑</span>}
                        {player.applicationUserDto.username}
                        {player.ready ? (
                            <DoneIcon sx={{marginLeft: '20px', color: 'green'}}/>
                        ) : (
                            <ClearIcon sx={{marginLeft: '20px', color: 'red'}}/>
                        )}
                    </Box>
                ))}
            </Box>

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
                            }}
                            onClick={handleOnReadyClick}
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
                            }}
                            onClick={handleOnStartClick}
                            disabled={!lobbyState.lobbyUsersDto.find((player) => player.isHost && player.applicationUserDto.id === loggedInUserId)}
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
