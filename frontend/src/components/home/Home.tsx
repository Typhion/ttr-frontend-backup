import Button from "@mui/material/Button";
import {useCreateLobby} from "../../hooks/useCreateLobby.ts";

import {useContext, useState} from "react";
import SecurityContext from "../../context/SecurityContext.ts";
import {Box, Grid, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useJoinLobby} from "../../hooks/useJoinLobby.ts";

export default function Home() {
    const {isAuthenticated} = useContext(SecurityContext);
    const navigate = useNavigate();
    const createLobby = useCreateLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });
    const joinLobby = useJoinLobby((uuid) => {
        navigate(`/lobby/${uuid}`);
    });

    const [lobbyCode, setLobbyCode] = useState("");

    const handleCreateLobbyClick = () => {
        createLobby.mutate();
    };

    const handleJoinLobbyClick = () => {
        joinLobby.mutate(lobbyCode);
    };

    if (isAuthenticated()) {
        return (
            <Grid container style={{justifyContent: 'center', alignItems: 'center'}} spacing={2}>
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
