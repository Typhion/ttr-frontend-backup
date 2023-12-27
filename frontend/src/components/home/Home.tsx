import Button from "@mui/material/Button";
import {useCreateLobby} from "../../hooks/lobbyHooks/useCreateLobby.ts";
import {useContext, useState} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {Box, Grid, TextField} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import {useJoinLobby} from "../../hooks/lobbyHooks/useJoinLobby.ts";

export default function Home() {
    const {isAuthenticated} = useContext(SecurityContext);
    const navigate = useNavigate();
    const createLobby = useCreateLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });
    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const { lobbyCode: paramLobbyCode } = useParams();
    const [lobbyCode, setLobbyCode] = useState(paramLobbyCode || "");

    const handleCreateLobbyClick = () => {
        createLobby.mutate();
    };

    const handleJoinLobbyClick = () => {
        joinLobby.mutate(lobbyCode);
    };

    const handleGetLobbiesClick = () => {
        navigate(`/lobby`);
    }

    if (isAuthenticated()) {
        return (
            <Grid container style={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{height: '100%', marginBottom: '10%'}}
                        onClick={handleGetLobbiesClick}
                    >
                        Lobbies
                    </Button>
                </Grid>
                <Grid container style={{justifyContent: 'center'}}>
                    <Grid item>
                        <TextField
                            label="Enter Lobby Code"
                            variant="outlined"
                            sx={{height: '100%'}}
                            value={lobbyCode}
                            onChange={(e) => setLobbyCode(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            sx={{marginLeft: '10px', height: '100%'}}
                            onClick={handleJoinLobbyClick}
                        >
                            Join
                        </Button>
                    </Grid>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{height: '100%'}}
                        onClick={handleCreateLobbyClick}
                    >
                        Create Lobby
                    </Button>
                </Grid>
            </Grid>
        );
    } else {
        return <Box>Please log in to view the rest of this page</Box>;
    }
}
