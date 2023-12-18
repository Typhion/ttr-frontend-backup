import {useNavigate} from "react-router-dom";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext, useState} from "react";
import {useJoinLobby} from "../../hooks/useJoinLobby.ts";
import {usePublicLobbies} from "../../hooks/usePublicLobbies.ts";
import {Box, Grid, Switch} from "@mui/material";
import Button from "@mui/material/Button";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import {useStartedLobbies} from "../../hooks/useStartedLobbies.ts";
import {LobbyState} from "../../model/LobbyState.ts";

export default function LobbyList() {
    const {isAuthenticated} = useContext(SecurityContext);
    const navigate = useNavigate();
    const [viewPublicLobbies, setViewPublicLobbies] = useState(true);
    const publicLobbies = usePublicLobbies();
    const startedLobbies = useStartedLobbies();

    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const handleJoinLobbyClick = (lobby: LobbyState) => {
        if (lobby.code) {
            joinLobby.mutate(lobby.code);
        } else {
            const uuid = lobby.gameId
            if (uuid) {
                navigate(`/game/${uuid}`);
            }
        }
    };


    const handleToggleView = () => {
        setViewPublicLobbies((prev) => !prev);
    };

    if (isAuthenticated()) {
        const currentLobbies = viewPublicLobbies ? publicLobbies : startedLobbies;

        return (
            <Grid container style={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{height: '100%', marginBottom: '10%', marginLeft: '1vw'}}
                        onClick={() => currentLobbies.refetch()}
                    >
                        Refresh
                    </Button>
                    <Switch
                        checked={viewPublicLobbies}
                        onChange={handleToggleView}
                        color="primary"
                        onClick={() => currentLobbies.refetch()}
                    />
                    {viewPublicLobbies ? <label>Open Lobbies</label> : <label>Started Lobbies</label>}
                </Grid>
                <Grid container style={{justifyContent: 'center'}}>
                    <Box sx={{
                        border: '1px solid black',
                        marginBottom: '10px',
                        padding: '10px',
                        display: 'flex',
                        flexDirection: 'row',
                        minWidth: '60vw',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                            <strong>Lobby</strong> <strong>Host</strong> <strong>Access</strong>
                            <strong>Code</strong> <strong>Join</strong>
                    </Box>
                    {currentLobbies.data && currentLobbies.data?.map((lobby, index) => (
                        <Box key={lobby.code || index}>
                            <Box sx={{
                                border: '1px solid black',
                                marginBottom: '10px',
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'row',
                                minWidth: '60vw',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <Box>
                                    {lobby.lobbyUsersDto.length}/{lobby.maxSize}
                                </Box>
                                <Box>
                                    {lobby.lobbyUsersDto.map((user) => (
                                        user.isHost && (
                                            <Box key={user.applicationUserDto.username}>
                                                {user.applicationUserDto.username}
                                            </Box>
                                        )
                                    ))}
                                </Box>
                                <Box>
                                    {lobby.isPublic ? <PublicIcon/> : <LockIcon/>}
                                </Box>
                                <Box>
                                    {lobby.code}
                                </Box>
                                <Button
                                    variant="contained"
                                    onClick={() => handleJoinLobbyClick(lobby)}
                                    disabled={lobby.lobbyUsersDto.length >= lobby.maxSize}
                                >
                                    {lobby.code ? 'Join Lobby' : 'Join Game'}
                                </Button>
                            </Box>
                        </Box>
                    ))}
                </Grid>
            </Grid>
        );
    } else {
        return <Box>Please log in to view the rest of this page</Box>;
    }
}
