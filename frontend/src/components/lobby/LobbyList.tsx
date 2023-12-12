import {useNavigate} from "react-router-dom";
import SecurityContext from "../../context/SecurityContext.ts";
import {useContext} from "react";
import {useJoinLobby} from "../../hooks/useJoinLobby.ts";
import {usePublicLobbies} from "../../hooks/usePublicLobbies.ts";
import {Box, Grid} from "@mui/material";
import Button from "@mui/material/Button";
import PublicIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';

export default function LobbyList() {
    const {isAuthenticated} = useContext(SecurityContext);
    const navigate = useNavigate();
    const publicLobbies = usePublicLobbies();

    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const handleJoinLobbyClick = (lobbyCode: string) => {
        joinLobby.mutate(lobbyCode);
    };

    const handleGoBack = () => {
        navigate(`/`);
    };

    if (isAuthenticated()) {
        return (
            <Grid container style={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleGoBack}
                        sx={{
                            marginBottom: '10%'
                        }}
                    >
                        Go Back to Home
                    </Button>
                    <Button
                        variant="contained"
                        sx={{height: '100%', marginBottom: '10%', marginLeft: '1vw'}}
                        onClick={() => publicLobbies.refetch()}
                    >
                        Refresh
                    </Button>
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
                    {publicLobbies.data?.map((lobby) => (

                        <Box key={lobby.code}>
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
                                    onClick={() => handleJoinLobbyClick(lobby.code)}
                                >
                                    Join Lobby
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
